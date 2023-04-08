import { Test, TestingModule } from '@nestjs/testing';
import { VacancyRespondController } from './vacancy-respond.controller';

describe('VacancyRespondController', () => {
  let controller: VacancyRespondController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacancyRespondController],
    }).compile();

    controller = module.get<VacancyRespondController>(VacancyRespondController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
