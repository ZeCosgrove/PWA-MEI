import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingCartDto } from './create-shopping-cart.dto';
import { IsEnum } from 'class-validator';
import { ShoppingCartSystemState } from '../enums/shopping-cart-system-state.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateShoppingCartSystemStateDto extends PartialType(
  CreateShoppingCartDto,
) {
  @ApiProperty()
  @IsEnum(ShoppingCartSystemState)
  systemState: ShoppingCartSystemState;
}
