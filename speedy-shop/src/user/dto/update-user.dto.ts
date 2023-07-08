import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsObject, IsString } from 'class-validator';
import { Address } from 'src/address/entities/address.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNumber()
  nif: number;

  @ApiProperty()
  @IsNumber()
  mobile: number;

  @ApiProperty()
  @IsObject()
  address: Address;
}
