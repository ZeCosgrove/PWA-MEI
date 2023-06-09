import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty()
  @IsString()
  name: string;
}
