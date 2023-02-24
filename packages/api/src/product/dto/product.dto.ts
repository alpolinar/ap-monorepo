import { Product } from '@prisma/client';

export type ProductDto = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  inventory: number;
};

export const convertProductToProductDto = (product: Product): ProductDto => {
  const { id, name, image, description, price, inventory } = product;
  return {
    id,
    name,
    image,
    description,
    price,
    inventory,
  };
};
