import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingCartDto } from './create-shopping-cart.dto';
import { IsEnum } from 'class-validator';
import { ShoppingCartSystemState } from '../enums/shopping-cart-system-state.enum';

export class UpdateShoppingCartSystemStateDto extends PartialType(CreateShoppingCartDto) {
    
    @IsEnum(ShoppingCartSystemState)
    systemState : ShoppingCartSystemState
}
