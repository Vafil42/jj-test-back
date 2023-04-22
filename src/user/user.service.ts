import {
  Injectable,
  Inject,
  ForbiddenException,
  BadRequestException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { SettingsService } from 'src/settings/settings.service';
import { SettingsEntity } from 'src/settings/settings.entity';

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
    try {
      dto.password = await this.jwtService.sign(dto.password);

      if (
        (
          await this.userRepository.findAndCountAll({
            where: { email: dto.email },
          })
        ).count != 0
      ) {
        throw new BadRequestException(
          'Пользователь таким email уже существует',
        );
      }

      const user = await this.userRepository.create(dto);
      const settings = await this.settingsService.create(user);
      await this.userRepository.sync();
      if (user) {
        return user;
      }
      return null;
    } catch (e) {
      throw new NotImplementedException('Поздравляю, вы сломали сервер');
    }
  }

  async ban(id: number, role: string) {
    try {
      const user = await this.userRepository.findByPk(id);
      this.permissionsCheck(user.role, role);
      await user.update({ banned: true });

      await this.userRepository.sync();
    } catch (e) {
      throw new NotImplementedException('Поздравляю, вы сломали сервер');
    }
  }

  async update(id: number, dto: UpdateUserDto, role: string) {
    try {
      const user = await this.userRepository.findByPk(id);
      this.permissionsCheck(user.role, role);
      await user.update(dto);
      await this.userRepository.sync();
      return user;
    } catch (e) {
      throw new NotImplementedException('Поздравляю, вы сломали сервер');
    }
  }

  async delete(id: number, role: string) {
    try {
      const user = await this.userRepository.findByPk(id);
      if (
        role === 'USER' ||
        (role === 'ADMIN' && user.role === 'ADMIN') ||
        (role === 'ADMIN' && user.role === 'ROOT')
      ) {
        throw new ForbiddenException('У вас нет прав доступа');
      }
      await user.destroy();
      this.userRepository.sync();
    } catch (e) {
      throw new NotImplementedException('Поздравляю, вы сломали сервер');
    }
  }

  async findById(id: number) {
    try {
      const user = await this.userRepository.findByPk(id, {
        include: [SettingsEntity],
      });
      return user;
    } catch (e) {
      throw new NotImplementedException('Поздравляю, вы сломали сервер');
    }
  }

  async loginUser(id: number) {
    try {
      const user = await this.userRepository.findByPk(id, {
        include: [SettingsEntity],
      });
      if (user) {
        return user;
      }
      return null;
    } catch (e) {
      throw new NotImplementedException('Поздравляю, вы сломали сервер');
    }
  }

  async loginAdmin(id: number) {
    try {
      const user = await this.userRepository.findByPk(id);
      if (user && (user.role === 'ADMIN' || user.role === 'ROOT')) {
        return user;
      }
      return null;
    } catch (e) {
      throw new NotImplementedException('Поздравляю, вы сломали сервер');
    }
  }

  async loginRoot(id: number) {
    try {
      const user = await this.userRepository.findByPk(id);
      if (user && user.role === 'ROOT') {
        return user;
      }
      return null;
    } catch (e) {
      throw new NotImplementedException('Поздравляю, вы сломали сервер');
    }
  }

  async validateUser(dto: LoginUserDto) {
    try {
      const { email, password } = dto;
      const user = await this.userRepository.findOne({
        where: { email },
        include: [SettingsEntity],
      });
      if (user && (await this.jwtCheсk(user, password)) === true) {
        return user;
      } else {
        return null;
      }
    } catch (e) {
      throw new NotImplementedException('Поздравляю, вы сломали сервер');
    }
  }

  private async jwtCheсk(user: UserEntity, password: string) {
    if (this.jwtService.sign(password) === user.password) {
      return true;
    } else {
      return null;
    }
  }

  private permissionsCheck(userRole: string, role: string) {
    if (
      role === 'USER' ||
      (role === 'ADMIN' && userRole === 'ADMIN') ||
      (role === 'ADMIN' && userRole === 'ROOT')
    ) {
      throw new ForbiddenException('У вас нет прав доступа');
    }
    return;
  }

  async findOneByEmail(email: string, token: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      user.update({ tokenPass: token });
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
