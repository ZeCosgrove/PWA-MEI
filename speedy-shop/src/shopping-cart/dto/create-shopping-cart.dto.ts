import { IsArray, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { ShoppingCartSystemState } from '../enums/shopping-cart-system-state.enum';
import { CartProduct } from 'src/cart-product/schemas/cart-product.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShoppingCartDto {
  @ApiProperty()
  @IsString()
  user: String;

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
