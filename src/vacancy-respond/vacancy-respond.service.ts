import { Inject, Injectable } from '@nestjs/common';
import {
  ForbiddenException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common/exceptions';
import { VacancyService } from '../vacancy/vacancy.service';
import { VacancyRespondEntity } from './vacancy-respond.entity';

@Injectable()
export class VacancyRespondService {
  constructor(
    @Inject('VACANCY_RESPOND_REPOSITORY')
    private vacancyRespondRepository: typeof VacancyRespondEntity,
    private vacancyService: VacancyService,
  ) {}

  async findAll() {
    return await this.vacancyRespondRepository.findAll();
  }

  async findAllWithHref(vacancyHref: string) {
    try {
      const responds = await this.vacancyRespondRepository.findAll({
        where: { vacancyHref },
      });
      if (!responds) {
        throw new NotFoundException('По вашему запросу ничего не найдено');
      } else {
        return responds;
      }
    } catch (e) {
      throw new NotImplementedException('Поздравляю, вы сломали сервер');
    }
  }

  async findAllWithId(userId: string) {
    try {
      const responds = await this.vacancyRespondRepository.findAll({
        where: { userId },
      });
      if (!responds) {
        throw new NotFoundException('По вашему запросу ничего не найдено');
      } else {
        return responds;
      }
    } catch (e) {
      throw new NotImplementedException('Поздравляю, вы сломали сервер');
    }
  }

  async findOne(vacancyHref: string, userId: number) {
    try {
      if (!(await this.vacancyService.findByHref(vacancyHref))) {
        throw new NotFoundException('Указанная вакансия не найдена');
      } else {
        const respond = await this.vacancyRespondRepository.findOne({
          where: { vacancyHref, userId },
        });
        if (!respond) {
          throw new NotFoundException(
            'Указанный пользователь не откликался на вакансию',
          );
        } else {
          return respond;
        }
      }
    } catch (e) {
      throw new NotImplementedException('Поздравляю, вы сломали сервер');
    }
  }

  async create(href: string, req: any) {
    try {
      if (req.user.implication !== 'physical') {
        throw new ForbiddenException('Вы не можете откликаться на вакансии');
      } else if (!(await this.vacancyService.findByHref(href))) {
        throw new NotFoundException('Указанная вакансия не найдена');
      } else {
        const respond = {
          vacancyHref: href,
          userId: req.user.id,
        };
        return await this.vacancyRespondRepository.create(respond);
      }
    } catch (e) {
      throw new NotImplementedException('Поздравляю, вы сломали сервер');
    }
  }

  async delete(vacancyHref: string, req: any) {
    try {
      const respond = await this.vacancyRespondRepository.findOne({
        where: { vacancyHref, userId: req.user.id },
      });
      if (!respond) {
        throw new NotFoundException('Вы не откликались на эту вакансию');
      } else {
        await respond.destroy();
        this.vacancyRespondRepository.sync();
      }
    } catch (e) {
      throw new NotImplementedException('Поздравляю, вы сломали сервер');
    }
  }
}