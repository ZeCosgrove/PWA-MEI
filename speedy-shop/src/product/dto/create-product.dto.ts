import {
  IsPositive,
  Length,
  IsNumber,
  IsString,
  IsEnum,
  Min,
} from 'class-validator';
import { ProductSystemState } from '../enums/product-system-state.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @Length(0, 20)
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @Length(0, 50)
  description: string;

  @ApiProperty()
  @IsPositive()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsNumber()
  location: number;

  @ApiProperty()
  @IsString()
  shop: string; // shop Id

  @ApiProperty()
  @IsEnum(ProductSystemState)
  systemState: ProductSystemState;
}
