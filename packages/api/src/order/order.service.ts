import { Injectable } from '@nestjs/common';
import {
  CreateOrderDto,
  UpdateOrderDto,
  convertOrdersToOrdersDto,
} from './dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  async create(createOrdersDto: CreateOrderDto) {
    const order = await this.prismaService.orders.create({
      data: {
        ...createOrdersDto,
      },
    });
    return convertOrdersToOrdersDto(order);
  }

  async findAll() {
    const orders = await this.prismaService.orders.findMany();
    return orders.map((order) => convertOrdersToOrdersDto(order));
  }

  async findAllById(id: string) {
    const order = await this.prismaService.orders.findUniqueOrThrow({
      where: { id },
    });
    return convertOrdersToOrdersDto(order);
  }

  async findAllByUserId(id: string) {
    const orders = await this.prismaService.orders.findMany({
      where: { userId: id },
    });
    return orders.map((order) => convertOrdersToOrdersDto(order));
  }

  async findOne(id: string) {
    const order = await this.prismaService.orders.findUniqueOrThrow({
      where: { id },
    });
    return convertOrdersToOrdersDto(order);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const updateOrder = await this.prismaService.orders.update({
      where: { id },
      data: { ...updateOrderDto },
    });
    return convertOrdersToOrdersDto(updateOrder);
  }

  async remove(id: string) {
    await this.prismaService.orders.delete({ where: { id } });
    return { status: 'success' };
  }
}
