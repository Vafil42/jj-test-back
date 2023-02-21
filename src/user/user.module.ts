import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';

dotenv.config();

@Module({
  exports: [UserService],
  imports: [JwtModule.register({ secret: process.env.JWTKEY })],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
})
export class UserModule {}
