import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from 'src/user/user.service';
import randomStructuredClone from '../vendor/random-str';

@Injectable()
export class EmailService {
    constructor(
        private mailerService: MailerService,
        private userService: UserService,
    ) {}

    async sendEmail(email: string, message: string) {
        const token = randomStructuredClone(8);
        await this.userService.findOneByEmail(email, token);
        await this.mailerService.sendMail({
            to: email,
            from: 'dalbab@inbox.ru',
            subject: message,
            text: token,
        });
        return;
    }

    async verifaiEmail(token: string) {
        return this.userService.verifaiEmail(token);
    }
}
