import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsPositive, IsNumber, Min } from 'class-validator';

export class UpdateProductQuantityDto extends PartialType(CreateProductDto) {
  @IsNumber()
  @Min(0)
  quantity: number;
}
