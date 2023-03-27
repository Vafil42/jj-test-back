import { ForbiddenException, Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewEntity } from './review.entity';
import { UserService } from '../user/user.service';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @Inject('REVIEW_REPOSITORY')
    private reviewRepository: typeof ReviewEntity,
    private userService: UserService,
  ) {}

  async create(dto: CreateReviewDto, req: any) {
    try {
    const review = {
      authorId: req.user.id,
      userId: dto.userId,
      body: dto.body,
      review: dto.review,
    };
    return await this.reviewRepository.create(review);
  } catch(e) {throw new NotImplementedException('Поздравляю, вы сломали сервер')}
  }

  async findAllByUserId(userId: number) {
    try {
    return await this.reviewRepository.findAll({ where: { userId } });
  } catch(e) {throw new NotImplementedException('Поздравляю, вы сломали сервер')}
  }

  async delete(id: number, req: any) {
    try {
    const review = await this.reviewRepository.findByPk(id);
    if (
      !(
        req.user.role === ('ADMIN' || 'ROOT') || req.user.id === review.authorId
      )
    ) {
      throw new ForbiddenException('У вас недостаточно прав доступа');
    }
    const newReview = await review.destroy();
    await this.reviewRepository.sync();
    return newReview;
  } catch(e) {throw new NotImplementedException('Поздравляю, вы сломали сервер')}
  }

  async update(id: number, dto: UpdateReviewDto, req: any) {
    try {
    const review = await this.reviewRepository.findByPk(id);
    if (
      !(
        req.user.role === ('ADMIN' || 'ROOT') || req.user.id === review.authorId
      )
    ) {
      throw new ForbiddenException('У вас недостаточно прав доступа');
    }
    const newReview = await review.update(dto);
    await this.reviewRepository.sync();
    return newReview;
  } catch(e) {throw new NotImplementedException('Поздравляю, вы сломали сервер')}
  }

  async hide(id: number, req: any) {
    try {
    const review = await this.reviewRepository.findByPk(id);
    if (!(req.user.role === ('ADMIN' || 'ROOT'))) {
      throw new ForbiddenException('У вас недостаточно прав доступа');
    }
    const newReview = await review.update({ show: false });
    await this.reviewRepository.sync();
    return newReview;
  } catch(e) {throw new NotImplementedException('Поздравляю, вы сломали сервер')}
  }
}
