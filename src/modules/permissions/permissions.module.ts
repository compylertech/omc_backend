import { Module } from '@nestjs/common';
import { PermissionsController } from './controller/permissions.controller';
import { PermissionsService } from './services/permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
