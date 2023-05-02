import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { articleProviders } from './article.providers';
import { ArticleService } from './article.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    exports: [],
    controllers: [ArticleController],
    providers: [ArticleService, ...articleProviders],
})
export class ArticleModule {}
