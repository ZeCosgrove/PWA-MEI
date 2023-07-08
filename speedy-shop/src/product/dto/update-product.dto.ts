import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsString, IsEnum } from 'class-validator';
import { ProductSystemState } from '../enums/product-system-state.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsNumber()
  location: number;

  @ApiProperty()
  @IsString()
  shop: string;

  @ApiProperty()
  @IsEnum(ProductSystemState)
  systemState: ProductSystemState;
}
