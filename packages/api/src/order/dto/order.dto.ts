import { Orders } from '@prisma/client';

export type OrdersDto = {
  id: string;
  userId: string;
  products: string;
};

export const convertOrdersToOrdersDto = (orders: Orders): OrdersDto => {
  const { id, userId, products } = orders;
  return {
    id,
    userId,
    products,
  };
};
