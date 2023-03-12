import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserAuthModule } from './auth/user.auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { VacancyController } from './vacancy/vacancy.controller';
import { VacancyModule } from './vacancy/vacancy.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    UserAuthModule,
    VacancyModule,
  ],
  controllers: [VacancyController],
  providers: [],
  exports: [],
})
export class AppModule {}
