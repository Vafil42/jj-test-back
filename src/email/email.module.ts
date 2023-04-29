import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { UserModule } from 'src/user/user.module';

@Module({
    exports: [],
    imports: [UserModule],
    controllers: [EmailController],
    providers: [EmailService],
})
export class EmailModule {}
