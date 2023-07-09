import { IsEnum } from 'class-validator';
import { UserSystemState } from '../enums/user-system-state.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserSystemStateDto {
  @ApiProperty()
  @IsEnum(UserSystemState)
  systemState: UserSystemState;
}
