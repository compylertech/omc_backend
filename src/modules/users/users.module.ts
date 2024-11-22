import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { Role } from '../roles/entities/role.entity';
import { UserRole } from '../user_role/entities/user_role.entity';
import { RolesModule } from '../roles/roles.module';
import { Privilege } from '../privileges/entities/privileges.entity';
import { PrivilegesModule } from '../privileges/privileges.module';
import { File } from '../files/entities/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, UserRole, Privilege, File]),
    RolesModule,
    PrivilegesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
