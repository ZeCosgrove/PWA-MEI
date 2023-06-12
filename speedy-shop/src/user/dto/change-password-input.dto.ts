import { IsEmail, IsString } from "class-validator"

export class ChangePasswordInputDto {

    @IsEmail()
    email: string

    @IsString()
    oldPassword: string

    @IsString()
    newPassword: string
}
