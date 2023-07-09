import { PartialType } from '@nestjs/mapped-types';
import { CreateShopLayoutDto } from './create-shop-layout.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateShopLayoutDto extends PartialType(CreateShopLayoutDto) {}
