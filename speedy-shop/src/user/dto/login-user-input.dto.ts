import { IsEmail, IsString } from "class-validator"

export class LoginUserInputDto {
    
    @IsEmail()
    email: string

    @IsString()
    password: string
}
