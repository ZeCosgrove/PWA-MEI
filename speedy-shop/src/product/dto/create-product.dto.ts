import {
  IsPositive,
  Length,
  IsNumber,
  IsString,
  IsEnum,
  Min,
} from 'class-validator';
import { ProductSystemState } from '../enums/product-system-state.enum';

export class CreateProductDto {
  @Length(0, 20)
  @IsString()
  name: string;

  @IsString()
  @Length(0, 50)
  description: string;

  @IsPositive()
  @IsNumber()
  price: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  category: string;

  @IsNumber()
  location: number;

  @IsString()
  shop: string; // shop Id

  @IsEnum(ProductSystemState)
  systemState: ProductSystemState;
}
