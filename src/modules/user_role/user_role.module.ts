import { Module } from '@nestjs/common';
import { UserRoleService } from './service/user_role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entities/user_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  controllers: [],
  providers: [UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleModule {}
