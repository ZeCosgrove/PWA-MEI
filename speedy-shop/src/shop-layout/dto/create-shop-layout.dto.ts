import {  
    IsArray, IsObject, IsString
} from 'class-validator';

import { Layout } from '../entities/layout.entity';

export class CreateShopLayoutDto {

    @IsString()
    name: string

    @IsObject()
    layout: Layout

    @IsArray()
    realWorldCoordinates: [number, number]
}
