import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class WorkerService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: typeof UserEntity
    ) {}

}
