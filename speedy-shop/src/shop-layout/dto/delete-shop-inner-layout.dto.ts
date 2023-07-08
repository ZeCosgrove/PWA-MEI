import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteShopInnerLayoutDto {
  @ApiProperty()
  @IsNumber()
  identifier: number;
}
