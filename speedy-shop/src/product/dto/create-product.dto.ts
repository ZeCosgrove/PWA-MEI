import {  
    IsPositive,
    Length,
    IsNumber,
    IsString,
    IsEnum,

} from 'class-validator';
import { ProductSystemState } from '../enums/product-system-state.enum';
import { ProductLocation } from 'src/product-location/schemas/product-location.schema';
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

    location: ProductLocation

    @IsEnum(ProductSystemState)
    systemState : ProductSystemState
}
