import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { reviewProviders } from './review.providers';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [ReviewService, ...reviewProviders],
  controllers: [ReviewController],
})
export class ReviewModule {}
