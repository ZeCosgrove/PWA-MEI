import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {  
    IsNumber,
    IsString,
    IsArray,
    IsEnum,

} from 'class-validator';
import { ProductSystemState } from '../enums/product-system-state.enum';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @IsString()
    name: string

    @IsString()
    description: string

    @IsNumber()
    price: number

    @IsNumber()
    quantity: number

    @IsNumber()
    category: number

    @IsArray()
    location: [number, number]
    
    @IsEnum(ProductSystemState)
    systemState : ProductSystemState
}
