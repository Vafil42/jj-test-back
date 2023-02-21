import { Module } from '@Nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { UserAuthController } from './user.auth.controller';

@Module({
  imports: [UserModule, PassportModule],
  controllers: [UserAuthController],
  providers: [LocalStrategy, JwtStrategy],
})
export class UserAuthModule {}
