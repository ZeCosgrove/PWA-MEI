import { PartialType } from '@nestjs/mapped-types';
import { CreateShopLayoutDto } from './create-shop-layout.dto';

export class UpdateShopLayoutDto extends PartialType(CreateShopLayoutDto) {}
