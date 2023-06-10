import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {  
    IsEnum
} from 'class-validator';
import { ProductSystemState } from '../enums/product-system-state.enum';

export class UpdateProductSystemStateDto extends PartialType(CreateProductDto) {

    @IsEnum(ProductSystemState)
    systemState?: ProductSystemState;
};
