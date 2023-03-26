import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './article/article.module';
import { UserAuthModule } from './auth/user.auth.module';
import { DatabaseModule } from './database/database.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { CategoryModule } from './category/category.module';
import { VacancyRespondController } from './vacancy-respond/vacancy-respond.controller';
import { VacancyRespondService } from './vacancy-respond/vacancy-respond.service';
import { VacancyRespondModule } from './vacancy-respond/vacancy-respond.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ArticleModule,
    DatabaseModule,
    UserModule,
    UserAuthModule,
    ReviewModule,
    VacancyModule,
    CategoryModule,
    VacancyRespondModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
