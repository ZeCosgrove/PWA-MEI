import { IsEmail } from "class-validator";

export class RecoverPasswordInputDto {

    @IsEmail()
    email: string
}
