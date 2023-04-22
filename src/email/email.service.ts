import {
  BadRequestException,
  Inject,
  Injectable,
  NotImplementedException,
  Query,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from 'src/user/user.service';
import randomStructuredClone from '../vendor/random-str';

@Injectable()
export class EmailService1 {
  constructor(
    private mailerService: MailerService,
    private userService: UserService,
  ) {}

  async sendEmail(email: string, message: string) {
    const token = randomStructuredClone(8);
    this.userService.findOneByEmail(email, token);
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
