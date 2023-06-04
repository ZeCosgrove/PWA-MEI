import {  
    IsPositive,
    Max,
    Min,
    Length,
    IsNumber,
    IsString,

} from 'class-validator';

export class CreateProductLocationDto {
    @IsString()
    product: string;

    @IsString()
    shop: string;

    @IsNumber()
    @Min(0)
    location: number;
}
