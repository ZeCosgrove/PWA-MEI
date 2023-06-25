import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {  
    IsNumber,
    IsString,
    IsEnum,
    IsBoolean,

} from 'class-validator';
import { ProductSystemState } from '../enums/product-system-state.enum';

export class UpdateProductHighlightDto extends PartialType(CreateProductDto){
    @IsBoolean()
    weeklyProduct: Boolean

    @IsBoolean()
    highlight: Boolean
}