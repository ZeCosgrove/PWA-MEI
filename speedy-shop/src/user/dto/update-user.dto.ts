import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsObject } from 'class-validator';
import { Address } from 'src/address/entities/address.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsNumber()
    nif: number;

    @IsNumber()
    mobile: number;

    @IsObject()
    address: Address;
}
