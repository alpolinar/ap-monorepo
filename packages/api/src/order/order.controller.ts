import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post('submit')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get()
  findAllById(@Query('id') id: string) {
    return this.orderService.findAllById(id);
  }

  @Get()
  findAllByUserId(@Query('id') id: string) {
    return this.orderService.findAllByUserId(id);
  }
}
