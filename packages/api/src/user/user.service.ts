import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { convertUserToUserDto } from './dto';
import { hashPassword } from 'src/utils/passwordManagement';

@Injectable()
export class UserService {
  constructor(private prismaSerivice: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hashPassword(createUserDto.password);
    const user = await this.prismaSerivice.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
    return convertUserToUserDto(user);
  }

  async findAll() {
    const users = await this.prismaSerivice.user.findMany();
    return users.map((user) => convertUserToUserDto(user));
  }

  async findUserById(id: string) {
    const user = await this.prismaSerivice.user.findUniqueOrThrow({
      where: { id },
    });
    return convertUserToUserDto(user);
  }

  async findUserByEmail(email: string) {
    const user = await this.prismaSerivice.user.findFirst({
      where: { email },
    });
    return convertUserToUserDto(user);
  }

  async update(id: string, updateUserDto: Partial<UpdateUserDto>) {
    const updateUser = await this.prismaSerivice.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
    return convertUserToUserDto(updateUser);
  }

  async remove(id: string) {
    await this.prismaSerivice.user.delete({ where: { id } });
    return { status: 'success' };
  }
}
