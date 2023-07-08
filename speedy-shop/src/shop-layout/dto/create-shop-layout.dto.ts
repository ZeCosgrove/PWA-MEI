import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsObject,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Layout } from '../entities/layout.entity';

export class CreateShopLayoutDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsObject()
  layout: Layout;

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  realWorldCoordinates: [];
}
