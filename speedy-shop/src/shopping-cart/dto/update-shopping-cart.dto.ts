import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingCartDto } from './create-shopping-cart.dto';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { ShoppingCartSystemState } from '../enums/shopping-cart-system-state.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateShoppingCartDto extends PartialType(CreateShoppingCartDto) {
  @ApiProperty()
  @IsString()
  user: String;

  @ApiProperty()
  @IsArray()
  products: Array<String>;

  @ApiProperty()
  @IsString()
  startDate: Date;

  @ApiProperty()
  @IsString()
  endDate?: Date;

  @ApiProperty()
  @IsEnum(ShoppingCartSystemState)
  systemState: ShoppingCartSystemState;
}
