import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { comparePassword } from 'src/utils/passwordManagement';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto, UserDto } from 'src/user/dto';
import { ConfigService } from '@nestjs/config';
import { hashPassword } from 'src/utils/passwordManagement';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findUserByEmail(email);
    const validPassword = await comparePassword(pass, user.password);
    if (user && validPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Omit<UserDto, 'password'>) {
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    const { refreshToken, ...userData } = user;
    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      record: { ...userData },
    };
  }

  async logout(id: string) {
    return this.userService.update(id, { refreshToken: null });
  }

  async register(createUserDto: CreateUserDto) {
    const userExists = await this.userService.findUserByEmail(
      createUserDto.email,
    );
    if (userExists) {
      throw new BadRequestException('Email already in use');
    }
    const hash = await hashPassword(createUserDto.password);
    const newUser = await this.userService.create({
      ...createUserDto,
      password: hash,
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await hashPassword(refreshToken);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(id: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(id: string, refreshToken: string) {
    const user = await this.userService.findUserById(id);
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }
    const refreshTokenMatch = await comparePassword(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshTokenMatch) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }
}
