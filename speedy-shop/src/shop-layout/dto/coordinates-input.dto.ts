import {  
    IsArray
} from 'class-validator';

export class CoordinatesInputDto {

    @IsArray()
    coordinates: [number, number]
}
