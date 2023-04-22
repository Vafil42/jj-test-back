import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService1 } from './email.service';
import { UserModule } from 'src/user/user.module';

@Module({
  exports: [],
  imports: [UserModule],
  controllers: [EmailController],
  providers: [EmailService1],
})
export class EmailModule {}
