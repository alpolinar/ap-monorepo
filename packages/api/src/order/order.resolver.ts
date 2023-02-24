import { Args, Query, Resolver } from '@nestjs/graphql';
import { OrdersService } from './order.service';

@Resolver()
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query()
  async fetchOrders() {
    return this.ordersService.findAll();
  }

  @Query()
  async fetchOrderById(@Args('id') id: string) {
    return this.ordersService.findAllById(id);
  }

  @Query()
  async fetchOrdersByUserId(@Args('id') id: string) {
    return this.ordersService.findAllByUserId(id);
  }
}
