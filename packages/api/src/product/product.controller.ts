import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request, query } from 'express';
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

  @Get('find')
  findOne(@Query('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch()
  update(@Query('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    console.log('update');
    console.log(id, updateProductDto);
    return this.productService.update(id, updateProductDto);
  }

  @Delete()
  remove(@Query('id') id: string) {
    return this.productService.remove(id);
  }
}
