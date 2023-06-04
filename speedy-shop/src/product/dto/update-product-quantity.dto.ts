import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {  
    IsPositive,
    Max,
    Length,
    IsNumber,
    IsString,
    Min,

} from 'class-validator';

export class UpdateProductQuantityDto extends PartialType(CreateProductDto) {

    @IsNumber()
    @IsPositive()
    @Min(0)
    quantity: number
};
