import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './article/article.module';
import { UserAuthModule } from './auth/user.auth.module';
import { DatabaseModule } from './database/database.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ArticleModule,
    DatabaseModule,
    UserModule,
    UserAuthModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
