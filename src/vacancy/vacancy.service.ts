import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { VacancyEntity } from './vacancy.entity';

@Injectable()
export class VacancyService {
  constructor(
    @Inject('VACANCY_REPOSITORY')
    private vacancyRepository: typeof VacancyEntity,
    private jwtService: JwtService,
  ) {}

  async findAll() {
    return await this.vacancyRepository.findAll();
  }

  async findByHref(href: string) {
    return await this.vacancyRepository.findByPk(href);
  }

  async create(dto: CreateVacancyDto) {
    return await this.vacancyRepository.create(dto, {});
  }

  async update() {
    return null;
  }

  async delete() {
    return null;
  }

  async path() {
    return null;
  }
}
