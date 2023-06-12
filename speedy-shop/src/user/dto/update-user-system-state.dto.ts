import { IsEnum } from 'class-validator';
import { UserSystemState } from '../enums/user-system-state.enum';

export class UpdateUserSystemStateDto {

    @IsEnum(UserSystemState)
    systemState: UserSystemState
}
