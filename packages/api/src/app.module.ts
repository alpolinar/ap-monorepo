import { Module } from '@nestjs/common';
import { ProductsModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [ProductsModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
