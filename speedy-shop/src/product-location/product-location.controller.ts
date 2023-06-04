import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductLocationService } from './product-location.service';
import { CreateProductLocationDto } from './dto/create-product-location.dto';
import { UpdateProductLocationDto } from './dto/update-product-location.dto';

@Controller('product-location')
export class ProductLocationController {
  constructor(private readonly productLocationService: ProductLocationService) {}

  @Post()
  create(@Body() createProductLocationDto: CreateProductLocationDto) {
    return this.productLocationService.create(createProductLocationDto);
  }

  @Get()
  findAll() {
    return this.productLocationService.findAll();
  }

  @Get('product/:id')
  findByProduct(@Param('id') id: string) {
    return this.productLocationService.findByProduct(id);
  }

  @Get('shop/:id')
  findByShop(@Param('id') id: string){
    return this.productLocationService.findByShop(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductLocationDto: UpdateProductLocationDto) {
    return this.productLocationService.update(id, updateProductLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productLocationService.remove(id);
  }
}
