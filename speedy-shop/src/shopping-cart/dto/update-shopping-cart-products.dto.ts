import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingCartDto } from './create-shopping-cart.dto';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateShoppingCartProductsDto extends PartialType(
  CreateShoppingCartDto,
) {
  @ApiProperty()
  @IsArray()
  products: Array<String>;
}
