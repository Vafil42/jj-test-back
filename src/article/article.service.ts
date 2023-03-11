import { BadRequestException, Inject, Injectable } from '@nestjs/common';
// import { trans } from 'src/vendor/Trans';
import { title } from 'process';
import trans from 'src/vendor/Trans';
import { ArticleEntity } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ARTICLE_REPOSITORY')
    private articleRepository: typeof ArticleEntity,
  ) {}
  async create(dto) {
    const href = trans(dto.title);
    const article = {
      title: dto.title,
      avatar: dto.avatar,
      body: dto.body,
      href,
    };
    return await this.articleRepository.create(article);
  }
  async findOne(href) {
    if (this.articleRepository.findOne({ where: { href } })) {
      return this.articleRepository.findOne({ where: { href } });
    } else {
      throw new BadRequestException('there is no such article');
    }
  }
  async findAll() {
    return await this.articleRepository.findAll();
  }
  async delete(id) {
    const article = await this.articleRepository.findByPk(id);
    if (article) {
      await article.destroy();
      this.articleRepository.sync();
    } else {
      throw new BadRequestException('there is no such article');
    }
  }
  async update(id, dto) {
    const article = await this.articleRepository.findByPk(id);
    if (article) {
      return await article.update(dto);
    } else {
      throw new BadRequestException('there is no such article');
    }
  }
}
