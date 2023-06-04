import { PartialType } from '@nestjs/mapped-types';
import { CreateProductLocationDto } from './create-product-location.dto';

import {  
    IsPositive,
    Max,
    Min,
    Length,
    IsNumber,
    IsString,

} from 'class-validator';

export class UpdateProductLocationDto extends PartialType(CreateProductLocationDto) {

    @IsString()
    product: string;

    @IsString()
    shop: string;

    @IsNumber()
    @Min(0)
    location: number;
}
