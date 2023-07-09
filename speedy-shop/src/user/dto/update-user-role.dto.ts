import { IsEnum } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRoleDto {
  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;
}
