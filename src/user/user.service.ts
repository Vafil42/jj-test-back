import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserPermissionEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

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
    try {
      dto.password = await this.jwtService.sign(dto.password);
      await this.userRepository.create(dto);
      await this.userRepository.sync();
    } catch (e) {
      return e;
    }
  }

  async ban(id: number) {
    const user = await this.userRepository.findByPk(id);
    await user.update({ banned: true });

    await this.userRepository.sync();
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userRepository.findByPk(id, {
      include: UserPermissionEntity,
    });
    if (dto.permission) {
      this.userPermissionEntity.create({
        userId: id,
        userEntity: user,
        permission: dto.permission,
      });
    }
    dto.password = 'pass';
    await user.update(dto);
    console.log(dto);
    await this.userRepository.sync();
  }

  async delete(id: number) {
    const user = await this.userRepository.findByPk(id);
    await user.destroy();
    this.userRepository.sync();
  }

  async findById(id: number) {
    const user = this.userRepository.findByPk(id, {
      include: UserPermissionEntity,
    });

    return user;
  }

  async login(dto: LoginUserDto) {
    const { email, password } = dto;
    const user = await this.userRepository.findOne({ where: { email } });
    if ((await this.jwtCheak(user, password)) === true) {
      return true;
    } else {
      return false;
    }
  }

  private async jwtCheak(user: UserEntity, password: string) {
    if (this.jwtService.sign(password) === user.password) {
      return true;
    } else {
      return false;
    }
  }
}
