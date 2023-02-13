import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { CreateProductInput } from 'src/graphql';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query()
  async fetchProducts() {
    return this.productService.findAll();
  }

  @Query()
  async fetchProductById(
    @Args('id')
    id: string,
  ) {
    return this.productService.findOne(id);
  }

  @Query()
  async fetchProductByKeyword(
    @Args('name')
    name: string,
  ) {
    return this.productService.search(name);
  }

  @Mutation()
  async createProduct(
    @Args('input')
    input: CreateProductInput,
  ) {
    return this.productService.create(input);
  }
}
