import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('search')
  search(@Query('keyword') keyword: string) {
    return this.productService.search(keyword);
  }

  @Get('find')
  findOne(@Query('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch()
  update(@Query('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete()
  remove(@Query('id') id: string) {
    return this.productService.remove(id);
  }
}
