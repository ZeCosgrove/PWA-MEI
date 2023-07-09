import { IsEnum } from 'class-validator';
import { ShopLayoutSystemState } from '../enums/shop-layout-system-state.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateShopLayoutSystemStateDto {
  @ApiProperty()
  @IsEnum(ShopLayoutSystemState)
  systemState: ShopLayoutSystemState;
}
