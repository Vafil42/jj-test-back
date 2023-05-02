import { Module } from '@Nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { UserAuthController } from './user.auth.controller';
import { UserAuthService } from './user.auth.service';
import * as dotenv from 'dotenv';
import { JwtUserStrategy } from './strategy/jwtUser.strategy';
import { JwtAdminStrategy } from './strategy/jwtAdmin.strategy';

dotenv.config();

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({ secret: process.env.JWT_SECRET }),
    ],
    controllers: [UserAuthController],
    providers: [
        LocalStrategy,
        JwtUserStrategy,
        JwtAdminStrategy,
        UserAuthService,
    ],
})
export class UserAuthModule {}
