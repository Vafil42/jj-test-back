import { IsString, IsDate, isNumber, IsNumber } from "class-validator";
export class CreateWorkerDto {
    @IsString() name: string;
    @IsString() email: string;
    @IsString() password: string;
    @IsDate() dateOfBirth: Date;
    @IsString() sity: string;
    @IsString() school: string;
    @IsString() inn: string;
    @IsString() work: string;
    @IsString() cv: string;
}