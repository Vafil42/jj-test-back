import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserAuthModule } from './auth/user.auth.module';
import { DatabaseModule } from './database/database.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    UserAuthModule,
    ReviewModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
