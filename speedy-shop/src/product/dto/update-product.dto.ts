import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {  
    IsPositive,
    Max,
    Length,
    IsNumber,
    IsString,

} from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    name: string
    description: string
    price: number
    quantity: number
    category: number
    location: number
    
}
