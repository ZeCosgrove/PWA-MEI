import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Get(':category')
  getProductsByCategory(@Param('category') category: string)
  {
    return this.productService.getProductsByCategory(+category)
  }

  @Get(':location')
  getProductsByLocation(@Param('location') location: string)
  {
    return this.productService.getProductsByCategory(+location)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.getProductsById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.changeProduct(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
