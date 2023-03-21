import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserAuthModule } from './auth/user.auth.module';
import { DatabaseModule } from './database/database.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { EsiaService } from './esia/esia.service';
import { EsiaModule } from './esia/esia.module';
import { SettingsModule } from './settings/settings.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    UserAuthModule,
    ReviewModule,
    EsiaModule,
    SettingsModule
  ],
  controllers: [],
  providers: [EsiaService],
  exports: [],
})
export class AppModule {}
