import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopLayoutService } from './shop-layout.service';
import { CreateShopLayoutDto } from './dto/create-shop-layout.dto';
import { UpdateShopLayoutDto } from './dto/update-shop-layout.dto';
import { UpdateShopLayoutSystemStateDto } from './dto/update-shop-layout-system-state.dto';
import { InnerLayout } from './entities/inner-layout.entity';
import { ShopLayout } from './schemas/shopping-layout.schema';
import { CoordinatesInputDto } from './dto/coordinates-input.dto';

@Controller('shop-layout')
export class ShopLayoutController {
  constructor(private readonly shopLayoutService: ShopLayoutService) {}

  @Post()
  createShopFloor(@Body() createShopLayoutDto: ShopLayout) {
    return this.shopLayoutService.createShopFloor(createShopLayoutDto);
  }

  @Get()
  getShopFloors() {
    return this.shopLayoutService.getShopFloors();
  }

  @Get(':id')
  getShopFloorById(@Param('id') id: string) {
    return this.shopLayoutService.getShopFloorById(id);
  }

  @Patch(':id')
  updateShopFloor(@Param('id') id: string, @Body() updateShopLayoutDto: UpdateShopLayoutDto) {
    return this.shopLayoutService.updateShopFloor(id, updateShopLayoutDto);
  }

  @Patch('/add-inner-layout/:id')
  addShopFloorInnerLayout(@Param('id') id: string, @Body() updateShopLayoutDto: InnerLayout) {
    return this.shopLayoutService.addShopFloorInnerLayout(id, updateShopLayoutDto);
  }

  @Patch('/remove-inner-layout/:id')
  removeShopFloorInnerLayout(@Param('id') id: string, @Body() updateShopLayoutDto: InnerLayout) {
    return this.shopLayoutService.removeShopFloorInnerLayout(id, updateShopLayoutDto);
  }

  @Patch('/change-system-state/:id')
  updateShopFloorSystemState(@Param('id') id: string, @Body() updateShopLayoutDto: UpdateShopLayoutSystemStateDto) {
    return this.shopLayoutService.updateShopFloorSystemState(id, updateShopLayoutDto);
  }

  @Post('/get-nearest')
  getNearestShopFloor(@Body() createShopLayoutDto: CoordinatesInputDto) {
    return this.shopLayoutService.getNearestShopFloor(createShopLayoutDto);
  }
}
