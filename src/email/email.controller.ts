import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SendEmailDto } from './send-email.dto';
import { EmailService1 } from './email.service';
import { VerifaiEmailDto } from './verifai-email.dto';

@Controller('email')
export class EmailController {
    constructor(private emailService: EmailService1) {}

    @Post('sendEmail')
    async sendEmail(@Body() dto: SendEmailDto) {
        return this.emailService.sendEmail(
            dto.email,
            'Подтверждение пароля, скопируйте код ниже:',
        );
    }

    @Post('verifai-email')
    async verifaiEmail(@Body() dto: VerifaiEmailDto) {
        return this.emailService.verifaiEmail(dto.token);
    }
}
