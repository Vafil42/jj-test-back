import { Module } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ClaimController } from './claim.controller';
import { claimProviders } from './claim.providers';

@Module({
  providers: [ClaimService, ...claimProviders],
  controllers: [ClaimController]
})
export class ClaimModule {}
