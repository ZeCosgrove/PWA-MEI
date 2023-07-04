import { IsArray, IsDate, IsEnum, IsNumber, IsString } from "class-validator";
import { ShoppingCartSystemState } from "../enums/shopping-cart-system-state.enum";
import { User } from "src/user/entities/user.entity";
import { Product } from "src/product/schemas/product.schema";
import { CartProduct } from "src/cart-product/schemas/cart-product.schema";

export class CreateShoppingCartDto {
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
