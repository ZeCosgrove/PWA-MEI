import {  
    IsString,
    IsArray,

} from 'class-validator';

export class CreateProductLocationDto {
    @IsString()
    product: string;

    @IsString()
    shop: string;

    @IsArray()
    location: [number, number];
}
