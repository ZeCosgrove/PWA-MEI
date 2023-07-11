import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingCartDto } from './create-shopping-cart.dto';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { ShoppingCartSystemState } from '../enums/shopping-cart-system-state.enum';
import { CartProduct } from 'src/cart-product/schemas/cart-product.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateShoppingCartDto extends PartialType(CreateShoppingCartDto) {
  @ApiProperty()
  @IsString()
  user: string;

  @ApiProperty()
  @IsArray()
  products?: Array<CartProduct>;

  @ApiProperty()
  @IsString()
  startDate: string;

  @ApiProperty()
  @IsString()
  endDate?: string;

  @ApiProperty()
  @IsEnum(ShoppingCartSystemState)
  systemState: ShoppingCartSystemState;
}
