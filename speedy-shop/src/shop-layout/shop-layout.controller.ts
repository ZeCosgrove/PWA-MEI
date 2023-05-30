import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopLayoutService } from './shop-layout.service';
import { CreateShopLayoutDto } from './dto/create-shop-layout.dto';
import { UpdateShopLayoutDto } from './dto/update-shop-layout.dto';

@Controller('shop-layout')
export class ShopLayoutController {
  constructor(private readonly shopLayoutService: ShopLayoutService) {}

  @Post()
  create(@Body() createShopLayoutDto: CreateShopLayoutDto) {
    return this.shopLayoutService.create(createShopLayoutDto);
  }

  @Get()
  findAll() {
    return this.shopLayoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopLayoutService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopLayoutDto: UpdateShopLayoutDto) {
    return this.shopLayoutService.update(+id, updateShopLayoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopLayoutService.remove(+id);
  }
}
