import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RecoverPasswordInputDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
