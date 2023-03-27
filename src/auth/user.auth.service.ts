import { Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserAuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    try {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.sign(payload),
      user: user,
    };
  } catch(e) {throw new InternalServerErrorException('Iternal server error', e)}
  }

  async createUser(dto: CreateUserDto) {
    try {
    const user = await this.userService.create(dto);
    return await this.login(user);
  } catch(e) {throw new InternalServerErrorException('Iternal server error', e)}
  }
}
