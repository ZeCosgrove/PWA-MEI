import { IsNumber } from 'class-validator';

export class DeleteShopInnerLayoutDto {
  @IsNumber()
  identifier: number;
}
