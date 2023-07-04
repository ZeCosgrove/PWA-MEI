import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingCartDto } from './create-shopping-cart.dto';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { ShoppingCartSystemState } from '../enums/shopping-cart-system-state.enum';

export class UpdateShoppingCartProductsDto extends PartialType(CreateShoppingCartDto) {
    @IsString()
    productId: string

    @IsNumber()
    quantity: number

    @IsNumber()
    discount: number
}
