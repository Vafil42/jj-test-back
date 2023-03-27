import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import trans from 'src/vendor/Trans';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ARTICLE_REPOSITORY')
    private articleRepository: typeof ArticleEntity,
  ) {}
  async create(dto: CreateArticleDto, req: any) {
    try {
    const href = trans(dto.title);
    const article = {
      title: dto.title,
      avatar: dto.avatar,
      body: dto.body,
      href,
      authorId: req.user.id,
    };
    return await this.articleRepository.create(article);
  } catch(e) {throw new InternalServerErrorException('Iternal server error', e)}
  }
  async findOne(href) {
    try {
    if (this.articleRepository.findOne({ where: { href } })) {
      return this.articleRepository.findOne({ where: { href } });
    } else {
      throw new BadRequestException('there is no such article');
    }
  } catch(e) {throw new InternalServerErrorException('Iternal server error', e)}
  }
  async findAll() {
    return await this.articleRepository.findAll();
  }
  async delete(id) {
    try {
    const article = await this.articleRepository.findByPk(id);
    if (article) {
      await article.destroy();
      this.articleRepository.sync();
    } else {
      throw new BadRequestException('there is no such article');
    }
  } catch(e) {throw new InternalServerErrorException('Iternal server error', e)}
  }
  async update(id, dto) {
    try {
    const article = await this.articleRepository.findByPk(id);
    if (article) {
      return await article.update(dto);
    } else {
      throw new BadRequestException('there is no such article');
    }
  } catch(e) {throw new InternalServerErrorException('Iternal server error', e)}
  }
}
