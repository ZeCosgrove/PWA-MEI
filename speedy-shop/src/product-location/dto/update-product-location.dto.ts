import { PartialType } from '@nestjs/mapped-types';
import { CreateProductLocationDto } from './create-product-location.dto';

export class UpdateProductLocationDto extends PartialType(CreateProductLocationDto) {}
