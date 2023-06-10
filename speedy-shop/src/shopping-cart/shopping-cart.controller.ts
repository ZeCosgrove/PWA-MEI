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
  createShoppingCart(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartService.createShoppingCart(createShoppingCartDto);
  }

  @Get()
  @HttpCode(200)
  getAllShoppingCart() {
    return this.shoppingCartService.getAllShoppingCarts();
  }

  @Get(':id')
  @HttpCode(200)
  getShoppingCartById(@Param('id') id: string) {
    return this.shoppingCartService.getShoppingCartById(id);
  }

  @Get('user/:id')
  @HttpCode(200)
  getShoppingCartByUser(@Param('id') id: string){
    return this.shoppingCartService.getShoppingCartByUser(id);
  }

  @Get('user-active/:id')
  @HttpCode(200)
  getActiveShoppingCartByUser(@Param('id') id: string){
    return this.shoppingCartService.getActiveShoppingCartByUser(id);
  }

  @Patch(':id')
  @HttpCode(200)
  updateShoppingCart(@Param('id') id: string, @Body() updateShoppingCartDto: UpdateShoppingCartDto) {
    return this.shoppingCartService.updateShoppingCart(id, updateShoppingCartDto);
  }

  @Patch('system-state/:id')
  @HttpCode(200)
  updateShoppingCartSystemState(@Param('id') id: string, @Body() updateSystemStateDto: UpdateShoppingCartSystemStateDto){
    return this.shoppingCartService.updateShoppingCartSystemState(id, updateSystemStateDto)
  }

}
