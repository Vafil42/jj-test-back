import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import * as dotenv from 'dotenv';
import { UserAuthController } from './user.auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { LocalStrategy } from './strategy/local.stategy';
import { JwtStrategy } from './strategy/jwt.strategy';

dotenv.config();

@Module({
  imports: [JwtModule.register({ secret: process.env.JWTKEY }), PassportModule],
  controllers: [UserController, UserAuthController],
  providers: [UserService, ...userProviders, LocalStrategy, JwtStrategy],
})
export class UserModule {}
