import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { SettingsModule } from 'src/settings/settings.module';

dotenv.config();

@Module({
    exports: [UserModule, UserService],
    imports: [
        JwtModule.register({ secret: process.env.DB_HASH_SECRET }),
        SettingsModule,
    ],
    controllers: [UserController],
    providers: [UserService, ...userProviders],
})
export class UserModule {}
