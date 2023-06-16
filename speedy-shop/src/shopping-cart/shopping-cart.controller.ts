import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, UseGuards } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { UpdateShoppingCartSystemStateDto } from './dto/update-shopping-cart-system-state.dto';
import { UpdateShoppingCartProductsDto } from './dto/update-shopping-cart-products.dto';

import { AuthGuard } from '../user/auth/auth.guard';
import { Roles } from '../user/auth/roles.decorator';
import { UserRole } from '../user/enums/user-role.enum';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff, UserRole.Client)
  createShoppingCart(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartService.createShoppingCart(createShoppingCartDto);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin)
  getAllShoppingCart() {
    return this.shoppingCartService.getAllShoppingCarts();
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff, UserRole.Client)
  getShoppingCartById(@Param('id') id: string) {
    return this.shoppingCartService.getShoppingCartById(id);
  }

  @Get('user/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff, UserRole.Client)
  getShoppingCartByUser(@Param('id') id: string){
    return this.shoppingCartService.getShoppingCartByUser(id);
  }

  @Get('user-active/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff, UserRole.Client)
  getActiveShoppingCartByUser(@Param('id') id: string){
    return this.shoppingCartService.getActiveShoppingCartByUser(id);
  }

  @Patch(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff, UserRole.Client)
  updateShoppingCart(@Param('id') id: string, @Body() updateShoppingCartDto: UpdateShoppingCartDto) {
    return this.shoppingCartService.updateShoppingCart(id, updateShoppingCartDto);
  }

  @Patch('system-state/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff, UserRole.Client)
  updateShoppingCartSystemState(@Param('id') id: string, @Body() updateSystemStateDto: UpdateShoppingCartSystemStateDto){
    return this.shoppingCartService.updateShoppingCartSystemState(id, updateSystemStateDto)
  }

  @Patch('products/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff, UserRole.Client)
  updateShoppingCartProducts(@Param('id') id: string, @Body() updateShoppingCartProducts: UpdateShoppingCartProductsDto){
    return this.shoppingCartService.updateShoppingCartProducts(id, updateShoppingCartProducts);
  }
}
