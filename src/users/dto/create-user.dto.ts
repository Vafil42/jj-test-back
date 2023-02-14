import { IsString, IsNumber, IsNotEmpty, IsBoolean } from "class-validator";
export class CreateUserDto {
    
    @IsString()
    lastname: string;

    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsBoolean()
    bannned: boolean;

    @IsString()
    permission: string[];

    @IsNumber()
    age: number;

    @IsString()
    birsday: string;

    @IsString()
    learn: string;

    @IsNotEmpty()
    @IsString()
    inn: string;
    
    @IsString()
    city: string;

    @IsString()
    about: string;

    @IsNumber()
    feedback: number;

    @IsString()
    role: string;
    
}