import { Test, TestingModule } from '@nestjs/testing';
import { VacancyRespondService } from './vacancy-respond.service';

describe('VacancyRespondService', () => {
  let service: VacancyRespondService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VacancyRespondService],
    }).compile();

    service = module.get<VacancyRespondService>(VacancyRespondService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
