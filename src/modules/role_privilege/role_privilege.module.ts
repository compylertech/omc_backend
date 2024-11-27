import { Module } from '@nestjs/common';
import { RolePrivilegeService } from './service/role_privilege.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePrivilege } from './entities/role_privilege.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolePrivilege])],
  controllers: [],
  providers: [RolePrivilegeService],
  exports: [RolePrivilegeService],
})
export class RolePrivilegeModule {}
