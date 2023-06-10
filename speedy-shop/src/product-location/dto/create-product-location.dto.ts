import {  
    IsString,
    IsNumber,

} from 'class-validator';

export class CreateProductLocationDto {
    @IsString()
    product: string;

    @IsString()
    shop: string;

    @IsNumber()
    location: number;
}
