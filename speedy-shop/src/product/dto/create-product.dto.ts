import {  
    IsPositive,
    Max,
    Length,
    IsNumber,
    IsString,

} from 'class-validator';
export class CreateProductDto {

    @Length(0, 20)
    @IsString()
    name: string

    @IsString()
    @Length(0, 50)
    description: string

    @IsPositive()
    @IsNumber()
    price: number

    @IsPositive()
    @IsNumber()
    quantity: number

    category: number

    location: number
}
