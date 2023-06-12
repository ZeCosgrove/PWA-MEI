import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingCartDto } from './create-shopping-cart.dto';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { ShoppingCartSystemState } from '../enums/shopping-cart-system-state.enum';

export class UpdateShoppingCartDto extends PartialType(CreateShoppingCartDto) {
    @IsString()
    user: String

    @IsArray()
    products: Array<String>

    @IsString()
    startDate: Date

    @IsString()
    endDate: Date

    @IsEnum(ShoppingCartSystemState)
    systemState : ShoppingCartSystemState
}
