import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './article/article.module';
import { UserAuthModule } from './auth/user.auth.module';
import { DatabaseModule } from './database/database.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { CategoryModule } from './category/category.module';
import { VacancyRespondModule } from './vacancy-respond/vacancy-respond.module';
import { AdminModule } from './admin/admin.module';
import { ClaimModule } from './claim/claim.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './email/email.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ArticleModule,
        EmailModule,
        DatabaseModule,
        UserModule,
        UserAuthModule,
        ReviewModule,
        CategoryModule,
        ClaimModule,
        MailerModule.forRoot({
            transport: {
                host: 'smtp.mail.ru',
                auth: {
                    user: 'dalbab@inbox.ru',
                    pass: 'EJr394hhqjJTm9D8x8Qc',
                },
            },
        }),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {}
