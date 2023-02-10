import { PrismaService } from 'src/prisma.service';
import { OrdersController } from './order.controller';
import { OrdersService } from './order.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService],
})
export class OrdersModule {}
