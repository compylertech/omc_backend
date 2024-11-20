import { Module } from '@nestjs/common';
import { RolePrivilegeService } from './service/role_privilege.service';

@Module({
  controllers: [],
  providers: [RolePrivilegeService],
})
export class RolePrivilegeModule {}
