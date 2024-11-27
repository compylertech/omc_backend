import { Module } from '@nestjs/common';
import { RolesController } from './controller/roles.controller';
import { RolesService } from './services/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { PrivilegesModule } from '../privileges/privileges.module';
import { Privilege } from '../privileges/entities/privileges.entity';
import { RolePrivilege } from '../role_privilege/entities/role_privilege.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, RolePrivilege, Privilege]),
    PrivilegesModule,
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
