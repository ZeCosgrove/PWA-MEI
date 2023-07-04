import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingCartDto } from './create-shopping-cart.dto';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { ShoppingCartSystemState } from '../enums/shopping-cart-system-state.enum';
import { CartProduct } from 'src/cart-product/schemas/cart-product.schema';

export class UpdateShoppingCartDto extends PartialType(CreateShoppingCartDto) {
    @IsString()
    user: string

    @IsArray()
    products?: Array<CartProduct>

    @IsString()
    startDate: string

    @IsString()
    endDate?: string

    @IsEnum(ShoppingCartSystemState)
    systemState : ShoppingCartSystemState
}
