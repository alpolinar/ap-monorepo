import { Injectable } from '@nestjs/common';
import {
  CreateProductDto,
  UpdateProductDto,
  convertProductToProductDto,
} from './dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
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
    return products.map((product) => convertProductToProductDto(product));
  }

  async findOne(id: string) {
    const product = await this.prismaService.product.findUniqueOrThrow({
      where: { id },
    });
    return convertProductToProductDto(product);
  }

  async search(keyword: string) {
    const products = await this.prismaService.product.findMany({
      where: { name: { contains: keyword, mode: 'insensitive' } },
    });
    return products.map((product) => convertProductToProductDto(product));
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updateProduct = await this.prismaService.product.update({
      where: { id },
      data: { ...updateProductDto },
    });
    return convertProductToProductDto(updateProduct);
  }

  async remove(id: string) {
    await this.prismaService.product.delete({ where: { id } });
    return { status: 'success' };
  }
}
