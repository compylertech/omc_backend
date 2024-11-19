import { Module } from '@nestjs/common';
import { UserRoleService } from './service/user_role.service';

@Module({
  controllers: [],
  providers: [UserRoleService],
})
export class UserRoleModule {}
