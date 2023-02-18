import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import * as dotenv from 'dotenv';
import { UserAuthController } from './user.auth.controller';

dotenv.config();

@Module({
  imports: [JwtModule.register({ secret: process.env.JWTKEY })],
  controllers: [UserController, UserAuthController],
  providers: [UserService, ...userProviders],
})
export class UserModule {}
