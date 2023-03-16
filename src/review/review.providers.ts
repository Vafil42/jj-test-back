import { ReviewEntity } from "./review.entity";


export const reviewProviders = [
    {
        provide: 'REVIEW_REPOSITORY',
        useValue: ReviewEntity,
    }
]