import { IsEnum, } from 'class-validator';
import { ShopLayoutSystemState } from '../enums/shop-layout-system-state.enum';

export class UpdateShopLayoutSystemStateDto {

    @IsEnum(ShopLayoutSystemState)
    systemState: ShopLayoutSystemState
}
