import { Module } from '@nestjs/common';
import { RolePermissionService } from './service/role_permission.service';

@Module({
  controllers: [],
  providers: [RolePermissionService],
})
export class RolePermissionModule {}
