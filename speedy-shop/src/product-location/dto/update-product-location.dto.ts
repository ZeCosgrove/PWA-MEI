import { PartialType } from '@nestjs/mapped-types';
import { CreateProductLocationDto } from './create-product-location.dto';

import {  
    IsString,
    IsNumber,

} from 'class-validator';

export class UpdateProductLocationDto extends PartialType(CreateProductLocationDto) {

    @IsString()
    product: string;

    @IsString()
    shop: string;

    @IsNumber()
    location: number;
}
