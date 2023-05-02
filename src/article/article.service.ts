import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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
        const href = trans(dto.title);
        const article = {
            title: dto.title,
            avatar: dto.avatar,
            body: dto.body,
            href,
            authorId: req.user.id,
        };
        return await this.articleRepository.create(article);
    }
    async findOne(href) {
        try {
            return this.articleRepository.findOne({ where: { href } });
        } catch (e) {
            throw new BadRequestException(
                'Bad request' + ' ' + 'Статьи с таким id не существует',
            );
        }
    }

    async findAll() {
        return await this.articleRepository.findAll();
    }
    async delete(id) {
        try {
            const article = await this.articleRepository.findByPk(id);
            await article.destroy();
            this.articleRepository.sync();
        } catch (e) {
            throw new BadRequestException(
                'Bad request' + ' ' + 'Статьи с таким id не существует',
            );
        }
    }

    async update(id, dto) {
        try {
            const article = await this.articleRepository.findByPk(id);
            return await article.update(dto);
        } catch (e) {
            throw new BadRequestException(
                'Bad request' + ' ' + 'Статьи с таким id не существует',
            );
        }
    }
}
