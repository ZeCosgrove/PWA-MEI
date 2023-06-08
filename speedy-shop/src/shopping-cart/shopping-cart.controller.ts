import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { UpdateShoppingCartSystemStateDto } from './dto/update-shopping-cart-system-state.dto';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post()
  @HttpCode(200)
  create(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartService.create(createShoppingCartDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.shoppingCartService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.shoppingCartService.findOne(id);
  }

  @Get('user/:id')
  @HttpCode(200)
  findByUserId(@Param('id') id: string){
    return this.shoppingCartService.findByUser(id);
  }

  @Get('user-active/:id')
  @HttpCode(200)
  findActiveByUserId(@Param('id') id: string){
    return this.shoppingCartService.findActiveByUser(id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateShoppingCartDto: UpdateShoppingCartDto) {
    return this.shoppingCartService.update(id, updateShoppingCartDto);
  }

  @Patch('system-state/:id')
  @HttpCode(200)
  updateSystemState(@Param('id') id: string, @Body() updateSystemStateDto: UpdateShoppingCartSystemStateDto){
    return this.shoppingCartService.updateSystemState(id, updateSystemStateDto)
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.shoppingCartService.remove(id);
  }
}
