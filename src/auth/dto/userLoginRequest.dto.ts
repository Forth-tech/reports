import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserLoginRequestDto {
    @ApiProperty({
        description: "Email of the user.",
        example: "johndoe@fake.com",
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: "Password of the user.",
        example: "password123",
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}