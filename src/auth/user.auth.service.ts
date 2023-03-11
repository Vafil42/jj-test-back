import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';

export class UserAuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.sign(payload),
      user: user,
    };
  }

  async createUser(dto: CreateUserDto) {
    return await this.login(await this.userService.create(dto, 'USER'));
  }
}
