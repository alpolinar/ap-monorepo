import { Module } from '@nestjs/common';
import { ProductsModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './order/order.module';

@Module({
  imports: [ProductsModule, UserModule, AuthModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
