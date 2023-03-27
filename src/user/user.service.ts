import {
  Injectable,
  Inject,
  ForbiddenException,
  BadRequestException,
  UnauthorizedException,
  NotImplementedException,
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
      if (user.implication === 'physical') {
        this.moderate(user.id);
      }
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

  async findNotModerated() {
    return await this.userRepository.findAll({ where: { moderate: false } });
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
      console.log(e);
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
      if (user && (await this.jwtCheck(user, password)) === true) {
        return user;
      } else {
        return null;
      }
    } catch (e) {
      throw new NotImplementedException('Поздравляю, вы сломали сервер');
    }
  }

  async changePassword(dto: ChangePasswordDto, req: any) {
    try {
      const password = dto.password;
      let newPassword = dto.newPassword;
      const user = await this.userRepository.findOne({
        where: { id: req.user.id },
      });
      if (user && (await this.jwtCheck(user, password))) {
        if (password !== newPassword) {
          newPassword = this.jwtService.sign(newPassword);
          await user.update({ password: newPassword });
          await this.userRepository.sync();
        } else {
          throw new BadRequestException('Текущий и новый пароли совпадают');
        }
      } else {
        throw new UnauthorizedException('Введен неверный пароль');
      }
    } catch (e) {
      throw new NotImplementedException('Поздравляю, вы сломали сервер');
    }
  }

  async moderate(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (user.moderate) {
        throw new BadRequestException('Этот пользователь уже прошел проверку');
      } else {
        await user.update({ moderate: true });
        await this.userRepository.sync();
      }
    } catch (e) {
      throw new NotImplementedException('Поздравляю, вы сломали сервер');
    }
  }

  private async jwtCheck(user: UserEntity, password: string) {
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
}
