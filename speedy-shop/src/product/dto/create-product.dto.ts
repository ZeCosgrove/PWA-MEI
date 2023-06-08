import {  
    IsPositive,
    Max,
    Length,
    IsNumber,
    IsString,
    IsArray,
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

    @IsNumber()
    category: number

    @IsArray()
    location: [number, number]

    @IsEnum(ProductSystemState)
    systemState : ProductSystemState
}
