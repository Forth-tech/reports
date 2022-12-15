import { ApiProperty } from "@nestjs/swagger";

export class UserOutDto {
    @ApiProperty({
        description: "ID of the user.",
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: "Name of the user.",
        example: "John",
    })
    name: string;

    @ApiProperty({
        description: "Email of the user.",
        example: "johndoe@fake.com",
    })
    email: string;
}