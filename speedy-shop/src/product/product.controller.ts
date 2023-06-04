import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductQuantityDto } from "./dto/update-product-quantity.dto";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(201)
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  @HttpCode(200)
  getProducts() {
    return this.productService.getProducts();
  }

  @Get('category/:category')
  @HttpCode(200)
  getProductsByCategory(@Param('category') category: number)
  {
    return this.productService.getProductsByCategory(category)
  }

  @Get('location/:location')
  @HttpCode(200)
  getProductsByLocation(@Param('location') location: number)
  {
    return this.productService.getProductsByLocation(location)
  }

  @Get('id/:id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.productService.getProductsById(id);
  }

  @Patch(':id')
  @HttpCode(201)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.changeProduct(id, updateProductDto);
  }

  @Patch('changeQuantity/:id')
  @HttpCode(201)
  updateQuantity(@Param('id') id: string, @Body() updateProductQuantityDto: UpdateProductQuantityDto) {
    return this.productService.changeProductQuantity(id, updateProductQuantityDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
