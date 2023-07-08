import { IsArray, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { ShoppingCartSystemState } from '../enums/shopping-cart-system-state.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShoppingCartDto {
  @ApiProperty()
  @IsString()
  user: String;

  @ApiProperty()
  @IsArray()
  products?: Array<String>;

  @ApiProperty()
  @IsString()
  startDate: Date;

  @ApiProperty()
  @IsString()
  endDate?: Date;

  @ApiProperty()
  @IsEnum(ShoppingCartSystemState)
  systemState: ShoppingCartSystemState;
}
