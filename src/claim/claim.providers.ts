import { ClaimEntity } from "./claim.entity";

export const claimProviders = [
    {
        provide: 'CLAIM_REPOSITORY',
        useValue: ClaimEntity,
    },
]