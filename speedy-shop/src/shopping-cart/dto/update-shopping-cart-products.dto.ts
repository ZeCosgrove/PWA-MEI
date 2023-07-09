import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingCartDto } from './create-shopping-cart.dto';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { ShoppingCartSystemState } from '../enums/shopping-cart-system-state.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateShoppingCartProductsDto extends PartialType(CreateShoppingCartDto) {
    @ApiProperty()  
    @IsString()
    productId: string
    
    @ApiProperty()
    @IsNumber()
    quantity: number

    @ApiProperty()
    @IsNumber()
    discount: number
}
