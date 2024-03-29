import { Inject, Injectable } from '@nestjs/common';
import {
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    NotImplementedException,
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
            throw new BadRequestException('Not Found', 'Вакансия не найдена');
        }
    }

    async findNotModerated() {
        return await this.vacancyRepository.findAll({
            where: { moderate: false },
        });
    }

    async create(dto: CreateVacancyDto, req: any) {
        if (!(req.user.implication === 'legal')) {
            throw new ForbiddenException(
                'Forbidden',
                'Недостаточно полномочий для совершения этого действия',
            );
        }
        const vacancy = {
            authorId: req.user.id,
            avatar: req.user.avatar,
            title: dto.title,
            href: trans(dto.title.split(' ').join('').toLowerCase()),
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
        if (!updatingVacancy) {
            throw new NotFoundException('Not Found', 'Вакансия не найдена');
        }
        if (
            !(
                req.user.id === updatingVacancy.authorId ||
                req.user.role === ('ADMIN' || 'ROOT')
            )
        ) {
            throw new ForbiddenException(
                'Forbidden',
                'Недостаточно полномочий для совершения этого действия',
            );
        }
        const vacancy = {
            title: dto.title,
            href: trans(dto.title.split(' ').join('').toLowerCase()),
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
        if (!deletingVacancy) {
            throw new NotFoundException('Not Found', 'Вакансия не найдена');
        }
        if (
            !(
                req.user.id === deletingVacancy.authorId ||
                req.user.role === ('ADMIN' || 'ROOT')
            )
        ) {
            throw new ForbiddenException(
                'Forbidden',
                'Недостаточно полномочий для совершения этого действия',
            );
        }
        await deletingVacancy.destroy();
        this.vacancyRepository.sync();
    }

    async hideOrShow(href: string, req: any) {
        const vacancy = await this.vacancyRepository.findOne({
            where: { href },
        });
        if (!vacancy) {
            throw new NotFoundException('Not Found', 'Вакансия не найдена');
        }
        if (!vacancy.moderate) {
            throw new ForbiddenException(
                'Forbidden',
                'Вакансия отправлена на проверку модераторам. Попробуйте позже',
            );
        } else {
            if (
                !(
                    req.user.id === vacancy.authorId ||
                    req.user.role === ('ADMIN' || 'ROOT')
                )
            ) {
                throw new ForbiddenException();
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

    async moderate(href: string) {
        const vacancy = await this.vacancyRepository.findOne({
            where: { href },
        });
        if (vacancy.moderate) {
            throw new BadRequestException(
                'Bad Request',
                'Эта вакансия уже прошла проверку',
            );
        } else {
            await vacancy.update({ moderate: true, show: true });
            await this.vacancyRepository.sync();
        }
    }
}
export { VacancyEntity };
