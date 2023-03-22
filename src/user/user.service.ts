import {
  Injectable,
  Inject,
  ForbiddenException,
  BadRequestException,
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
    return await this.userRepository.findAll({include: [SettingsEntity]});
  }

  async create(dto: CreateUserDto) {
    dto.password = this.jwtService.sign(dto.password);
    if (
      (
        await this.userRepository.findAndCountAll({
          where: { email: dto.email },
        })
      ).count != 0
    ) {
      throw new BadRequestException('Пользователь таким email уже существует');
    }

    const user = await this.userRepository.create(dto);
    const settings = await this.settingsService.create(user)
    await this.userRepository.sync();
    if (user) {
      return user;
    }
    return null;
  }

  async ban(id: number, role: string) {
    const user = await this.userRepository.findByPk(id);
    if (
      role === 'USER' ||
      (role === 'ADMIN' && user.role === 'ADMIN') ||
      (role === 'ADMIN' && user.role === 'ROOT')
    ) {
      throw new ForbiddenException('У вас нет прав доступа');
    }
    await user.update({ banned: true });

    await this.userRepository.sync();
  }

  async update(id: number, dto: UpdateUserDto, role: string) {
    const user = await this.userRepository.findByPk(id);
    if (
      role === 'USER' ||
      (role === 'ADMIN' && user.role === 'ADMIN') ||
      (role === 'ADMIN' && user.role === 'ROOT')
    ) {
      throw new ForbiddenException('У вас нет прав доступа');
    }
    await user.update(dto);
    await this.userRepository.sync();
    return user;
  }

  async delete(id: number, role: string) {
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
  }

  async findById(id: number) {
    const user = await this.userRepository.findByPk(id, {include: [SettingsEntity]});
    return user;
  }

  async loginUser(id: number) {
    const user = await this.userRepository.findByPk(id, {include: [SettingsEntity]});
    if (user) {
      return user;
    }
    return null;
  }

  async loginAdmin(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (user && (user.role === 'ADMIN' || user.role === 'ROOT')) {
      return user;
    }
    return null;
  }

  async loginRoot(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (user && user.role === 'ROOT') {
      return user;
    }
    return null;
  }

  async validateUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const user = await this.userRepository.findOne({ where: { email }, include: [SettingsEntity]});
    if (user && (await this.jwtCheak(user, password)) === true) {
      return user;
    } else {
      return null;
    }
  }

  private async jwtCheak(user: UserEntity, password: string) {
    if (this.jwtService.sign(password) === user.password) {
      return true;
    } else {
      return null;
    }
  }
}
