import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddShopInnerLayoutDto {
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  upperLeft: [];

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  upperRight: [];

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  bottomLeft: [];

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  bottonRigh: [];

  @ApiProperty()
  @IsBoolean()
  isObstacle: boolean;
}
