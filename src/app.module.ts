import { Module } from '@nestjs/common';
import { WorkerModule } from './worker/worker.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
    imports: [ConfigModule.forRoot({isGlobal: true}), DatabaseModule, WorkerModule, UsersModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: []
})
export class AppModule {}