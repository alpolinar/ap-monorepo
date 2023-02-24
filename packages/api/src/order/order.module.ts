import { PrismaService } from 'src/prisma.service';
import { OrdersController } from './order.controller';
import { OrdersService } from './order.service';
import { Module } from '@nestjs/common';
import { OrdersResolver } from './order.resolver';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, OrdersResolver],
})
export class OrdersModule {}
