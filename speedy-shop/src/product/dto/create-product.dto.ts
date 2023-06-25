import {  
    IsPositive,
    Length,
    IsNumber,
    IsString,
    IsEnum,

} from 'class-validator';
import { ProductSystemState } from '../enums/product-system-state.enum';

export class CreateProductDto {

    @Length(0, 20)
    @IsString()
    name: string

    @IsString()
    @Length(0, 50)
    description: string

    @IsPositive()
    @IsNumber()
    price: number

    @IsPositive()
    @IsNumber()
    quantity: number

    @IsString()
    category: string

    @IsPositive()
    @IsNumber()
    location: number

    @IsString()
    shop: string // shop Id

    @IsEnum(ProductSystemState)
    systemState : ProductSystemState
}
