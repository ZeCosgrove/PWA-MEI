import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductHighlightDto extends PartialType(CreateProductDto) {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  weeklyProduct: Boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  highlight: Boolean;
}
