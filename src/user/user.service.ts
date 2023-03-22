import {
  Injectable,
  Inject,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserPermissionEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof UserEntity,
    @Inject('USER_PERMISSION_REPOSITORY')
    private userPermissionEntity: typeof UserPermissionEntity,
    private jwtService: JwtService,
  ) {}

  async findAll() {
    return await this.userRepository.findAll();
  }

  async create(dto: CreateUserDto) {
    dto.password = await this.jwtService.sign(dto.password);
    if (
      (
        await this.userRepository.findAndCountAll({
          where: { email: dto.email },
        })
      ).count != 0
    ) {
      throw new BadRequestException('Пользователь таким email уже существует');
    }
    const user = await this.userRepository.create(dto, {});
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
    const user = await this.userRepository.findByPk(id, {
      include: UserPermissionEntity,
    });
    if (
      role === 'USER' ||
      (role === 'ADMIN' && user.role === 'ADMIN') ||
      (role === 'ADMIN' && user.role === 'ROOT')
    ) {
      throw new ForbiddenException('У вас нет прав доступа');
    }
    if (dto.permission) {
      this.userPermissionEntity.create({
        userId: id,
        userEntity: user,
        permission: dto.permission,
      });
    }
    dto.password = 'pass';
    await user.update(dto);
    await this.userRepository.sync();
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
    const user = await this.userRepository.findByPk(id, {
      include: UserPermissionEntity,
    });

    return user;
  }

  async loginUser(id: number) {
    const user = await this.userRepository.findByPk(id);
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
    const user = await this.userRepository.findOne({ where: { email } });
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
