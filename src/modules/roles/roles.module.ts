import { Module } from '@nestjs/common';
import { RolesController } from './controller/roles.controller';
import { RolesService } from './services/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolePermission } from '../role_permission/entities/role_permission.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, RolePermission, Permission]),
    PermissionsModule,
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
