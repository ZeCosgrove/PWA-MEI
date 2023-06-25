import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingCartDto } from './create-shopping-cart.dto';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { ShoppingCartSystemState } from '../enums/shopping-cart-system-state.enum';

export class UpdateShoppingCartProductsDto extends PartialType(CreateShoppingCartDto) {
    @IsArray()
    products: Array<String>
}
