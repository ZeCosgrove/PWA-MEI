import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class InnerLayout {
  identifier: number;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  upperLeft: [];

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  upperRight: [];

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  bottomLeft: [];

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  bottonRigh: [];

  @IsBoolean()
  isObstacle: boolean;
}
