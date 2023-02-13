import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from 'src/prisma.service';
import { ProductResolver } from './product.resolver';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, ProductResolver],
})
export class ProductsModule {}
