import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductHighlightDto extends PartialType(CreateProductDto) {
  @ApiProperty()
  @IsBoolean()
  weeklyProduct: Boolean;

  @ApiProperty()
  @IsBoolean()
  highlight: Boolean;
}
