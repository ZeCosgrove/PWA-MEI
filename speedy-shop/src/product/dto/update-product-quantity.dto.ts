import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsPositive, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductQuantityDto extends PartialType(CreateProductDto) {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  quantity: number;
}
