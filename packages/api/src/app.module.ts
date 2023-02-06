import { Module } from '@nestjs/common';
import { ProductsModule } from './product/product.module';

@Module({
  imports: [ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
