import { IsArray, IsDate, IsEnum, IsNumber, IsString } from "class-validator";
import { ShoppingCartSystemState } from "../enums/shopping-cart-system-state.enum";
import { User } from "src/user/entities/user.entity";
import { Product } from "src/product/schemas/product.schema";

export class CreateShoppingCartDto {
    @IsString()
    user: String

    @IsArray()
    products?: Array<String>

    @IsString()
    startDate: Date

    @IsString()
    endDate?: Date

    @IsEnum(ShoppingCartSystemState)
    systemState : ShoppingCartSystemState
}
