import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CoordinatesInputDto {
  @ApiProperty()
  @IsArray()
  coordinates: [number, number];
}
