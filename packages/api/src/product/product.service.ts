import { Injectable } from '@nestjs/common';
import { CreateProductDto, convertProductToProductDto } from './dto';
import { PrismaService } from 'src/prisma.service';

@Injectable({})
export class ProductService {
  constructor(private prismaService: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this.prismaService.product.create({
      data: {
        ...createProductDto,
      },
    });
    return convertProductToProductDto(product);
  }

  async findAll() {
    const products = await this.prismaService.product.findMany();
    return products.map((p) => convertProductToProductDto(p));
  }
}
