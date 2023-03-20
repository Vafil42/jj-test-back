import { Inject, Injectable } from '@nestjs/common';
import {
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common/exceptions';
import trans from 'src/vendor/Trans';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { VacancyEntity } from './vacancy.entity';

@Injectable()
export class VacancyService {
  constructor(
    @Inject('VACANCY_REPOSITORY')
    private vacancyRepository: typeof VacancyEntity,
  ) {}

  async findAll() {
    return await this.vacancyRepository.findAll();
  }

  async findByHref(href: string) {
    if (this.vacancyRepository.findOne({ where: { href } })) {
      return await this.vacancyRepository.findOne({ where: { href } });
    } else {
      throw new BadRequestException('There is now such vacancy');
    }
  }

  async create(dto: CreateVacancyDto, req: any) {
    if (!(req.user.implication === 'legal')) {
      throw new ForbiddenException('У вас нет разрешений на это действие');
    }
    const vacancy = {
      authorId: req.user.userId,
      avatar: req.user.avatar,
      title: dto.title,
      href: trans(dto.title),
      category: dto.category,
      region: dto.region,
      body: dto.body,
      requiredExp: dto.requiredExp,
    };
    return await this.vacancyRepository.create(vacancy);
  }

  async update(href: string, dto: UpdateVacancyDto, req: any) {
    const updatingVacancy = await this.vacancyRepository.findOne({
      where: { href },
    });
    if (
      !(
        req.user.id === updatingVacancy.authorId ||
        req.user.role === ('ADMIN' || 'ROOT')
      )
    ) {
      throw new ForbiddenException('У вас недостаточно прав доступа');
    }
    const vacancy = {
      title: dto.title,
      href: trans(dto.title),
      category: dto.category,
      timestamp: dto.timestamp,
      region: dto.region,
      priority: dto.priority,
      body: dto.body,
      requiredExp: dto.requiredExp,
    };
    const updatedVacancy = await updatingVacancy.update(vacancy);
    await this.vacancyRepository.sync();
    return updatedVacancy;
  }

  async delete(href: string, req: any) {
    const deletingVacancy = await this.vacancyRepository.findOne({
      where: { href },
    });
    if (
      !(
        req.user.id === deletingVacancy.authorId ||
        req.user.role === ('ADMIN' || 'ROOT')
      )
    ) {
      throw new ForbiddenException('У вас недостаточно прав доступа');
    }
    const deletedVacancy = await deletingVacancy.destroy();
    await this.vacancyRepository.sync();
    return deletedVacancy;
  }

  async hideOrShow(href: string, req: any) {
    const vacancy = await this.vacancyRepository.findOne({
      where: { href },
    });
    if (
      !(
        req.user.id === vacancy.authorId ||
        req.user.role === ('ADMIN' || 'ROOT')
      )
    ) {
      throw new ForbiddenException('У вас недостаточно прав доступа');
    }
    if (vacancy.show) {
      const updatedVacancy = await vacancy.update({ show: false });
      await this.vacancyRepository.sync();
      return updatedVacancy;
    } else {
      const updatedVacancy = await vacancy.update({ show: true });
      await this.vacancyRepository.sync();
      return updatedVacancy;
    }
  }
}
