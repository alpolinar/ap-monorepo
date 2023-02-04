import { Product } from '@prisma/client';

export type ProductDto = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
};

export const convertProductToProductDto = (p: Product): ProductDto => {
  const { id, name, image, description, price } = p;
  return {
    id,
    name,
    image,
    description,
    price,
  };
};
