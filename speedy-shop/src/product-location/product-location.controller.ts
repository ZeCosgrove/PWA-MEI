import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductLocationService } from './product-location.service';
import { CreateProductLocationDto } from './dto/create-product-location.dto';
import { UpdateProductLocationDto } from './dto/update-product-location.dto';

@Controller('product-location')
export class ProductLocationController {
  constructor(private readonly productLocationService: ProductLocationService) {}

  @Post()
  createProductLocation(@Body() createProductLocationDto: CreateProductLocationDto) {
    return this.productLocationService.createProductLocation(createProductLocationDto);
  }

  @Get()
  getProductLocations() {
    return this.productLocationService.getProductLocations();
  }

  @Get('product/:id')
  getProductLocationByProduct(@Param('id') id: string) {
    return this.productLocationService.findByProduct(id);
  }

  @Get('shop/:id')
  getProductLocationByShop(@Param('id') id: string){
    return this.productLocationService.findByShop(id);
  }

  @Patch(':id')
  updateProductLocation(@Param('id') id: string, @Body() updateProductLocationDto: UpdateProductLocationDto) {
    return this.productLocationService.updateProductLocation(id, updateProductLocationDto);
  }

  @Delete(':id')
  removeProductLocation(@Param('id') id: string) {
    return this.productLocationService.removeProductLocation(id);
  }
}
