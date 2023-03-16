import { ArticleEntity } from './article.entity';

export const articleProviders = [
  {
    provide: 'ARTICLE_REPOSITORY',
    useValue: ArticleEntity,
  },
];
