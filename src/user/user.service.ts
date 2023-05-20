import {
    Injectable,
    Inject,
    ForbiddenException,
    BadRequestException,
    UnauthorizedException,
    NotImplementedException,
    InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { SettingsService } from 'src/settings/settings.service';
import { SettingsEntity } from 'src/settings/settings.entity';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: typeof UserEntity,
        private jwtService: JwtService,
        private settingsService: SettingsService,
    ) {}

    async findAll() {
        return await this.userRepository.findAll({ include: [SettingsEntity] });
    }

    async create(dto: CreateUserDto) {
        dto.password = this.jwtService.sign(dto.password);

        if (this.userRepository.findAll({ where: { email: dto.email } })) {
            throw new BadRequestException(
                'Bad request',
                'Пользователь с таким email уже существует',
            );
        }

        const user = await this.userRepository.create(dto);
        if (user) {
            return user;
        }
        return null;
    }

    async findNotModerated() {
        return await this.userRepository.findAll({
            where: { moderate: false },
        });
    }

    async ban(id: number, role: string) {
        const user = await this.userRepository.findByPk(id);
        if (!user) {
            throw new BadRequestException(
                'Bad request',
                'Пользователя с таким id не существует',
            );
        }
        this.permissionsCheckOnlyAdmin(user.role, role);
        await user.update({ banned: true });
        return user;
    }

    async update(id: number, dto: UpdateUserDto, subUser: UserEntity) {
        const user = await this.userRepository.findByPk(id);
        if (!user) {
            throw new BadRequestException(
                'Bad request',
                'Пользователя с таким id не существует',
            );
        }
        this.permissionsCheckAdminOrUser(subUser.role, subUser.id, id);
        await user.update(dto);
        return user;
    }

    async delete(id: number, role: string) {
        const user = await this.userRepository.findByPk(id);
        if (!user) {
            throw new BadRequestException(
                'Bad request',
                'Пользователя с таким id не существует',
            );
        }
        if (
            role === 'USER' ||
            (role === 'ADMIN' && user.role === 'ADMIN') ||
            (role === 'ADMIN' && user.role === 'ROOT')
        ) {
            throw new ForbiddenException('У вас нет прав доступа');
        }
        await user.destroy();
        this.userRepository.sync();
        return user;
    }

    async findById(id: number) {
        const user = await this.userRepository.findByPk(id, {
            include: [SettingsEntity],
        });
        if (!user) {
            throw new BadRequestException(
                'Bad request',
                'Пользователя с таким id не существует',
            );
        }
        return user;
    }

    async loginUser(id: number) {
        const user = await this.userRepository.findByPk(id, {
            include: [SettingsEntity],
        });
        if (!user) {
            throw new BadRequestException(
                'Bad request',
                'Пользователя с таким id не существует',
            );
        }
        return user;
    }

    async loginAdmin(id: number) {
        const user = await this.userRepository.findByPk(id);
        if (user && (user.role === 'ADMIN' || user.role === 'ROOT')) {
            return user;
        }
        throw new BadRequestException(
            'Bad request',
            'Пользователя с таким id не существует',
        );
    }

    async loginRoot(id: number) {
        const user = await this.userRepository.findByPk(id);
        if (user && user.role === 'ROOT') {
            return user;
        }
        throw new BadRequestException(
            'Bad request',
            'Пользователя с таким id не существует',
        );
    }

    async validateUser(dto: LoginUserDto) {
        const { email, password } = dto;
        const user = await this.userRepository.findOne({
            where: { email },
            include: [SettingsEntity],
        });
        if (user && (await this.jwtCheck(user, password)) === true) {
            return user;
        } else {
            throw new BadRequestException(
                'Bad request',
                'Пользователя с таким id не существует',
            );
        }
    }

    async changePassword(dto: ChangePasswordDto, req: any) {
        const password = dto.password;
        const newPassword = dto.newPassword;
        if (await this.jwtCheck(req.user, password)) {
            if (password !== newPassword) {
                await req.user.update({
                    password: this.jwtService.sign(newPassword),
                });
                await this.userRepository.sync();
            } else {
                throw new BadRequestException(
                    'Текущий и новый пароли совпадают',
                );
            }
        } else {
            throw new BadRequestException(
                'Bad request',
                'Введен неверный пароль',
            );
        }
    }

    async moderate(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (user.moderate) {
            throw new BadRequestException(
                'Bad request',
                'Этот пользователь уже прошел проверку',
            );
        } else {
            await user.update({ moderate: true });
            await this.userRepository.sync();
        }
    }

    private async jwtCheck(user: UserEntity, password: string) {
        if (this.jwtService.sign(password) === user.password) {
            return true;
        } else {
            return null;
        }
    }

    private permissionsCheckOnlyAdmin(userRole: string, role: string) {
        if (
            role === 'USER' ||
            (role === 'ADMIN' && userRole === 'ADMIN') ||
            (role === 'ADMIN' && userRole === 'ROOT')
        ) {
            throw new ForbiddenException(
                'Forbidden',
                'У вас недостаточно прав доступа',
            );
        }
        return;
    }

    private permissionsCheckAdminOrUser(
        role: string,
        id: number,
        userId: number,
    ) {
        if (!(role === ('ADMIN' || 'ROOT') || id === userId)) {
            throw new ForbiddenException(
                'Forbidden',
                'У вас недостаточно прав доступа',
            );
        }
    }

    async findOneByEmail(email: string, token: string) {
        try {
            const user = await this.userRepository.findOne({
                where: { email },
            });
            if (user === null) {
                throw new BadRequestException(
                    'Bad request',
                    'Пользователя с таким email не существует',
                );
            }
            await user.update({ tokenPass: token });
            this.userRepository.sync();
            return user;
        } catch (e) {
            throw new BadRequestException(
                'Bad request',
                'Пользователя с таким email не существует',
            );
        }
    }

    async verifaiEmail(token: string) {
        try {
            const user = await this.userRepository.findOne({
                where: { tokenPass: token },
            });
            user.update({ emailVerified: true });
            this.userRepository.sync();
            return user;
        } catch (e) {
            throw new BadRequestException('Bad request', 'Не правильный код');
        }
    }
}
