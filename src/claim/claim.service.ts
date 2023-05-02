import {
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { ClaimEntity } from './claim.entity';
import { CreateClaimDto } from './dto/create-claim.dto';

@Injectable()
export class ClaimService {
    constructor(
        @Inject('CLAIM_REPOSITORY')
        private claimRepository: typeof ClaimEntity,
    ) {}

    async create(dto: CreateClaimDto) {
        try {
            return await this.claimRepository.create(dto);
        } catch (e) {
            throw new InternalServerErrorException('Iternal server error', e);
        }
    }

    async findNotModerated() {
        try {
            return this.claimRepository.findAll({
                where: { moderated: false },
            });
        } catch (e) {
            throw new InternalServerErrorException('Iternal server error', e);
        }
    }
}
