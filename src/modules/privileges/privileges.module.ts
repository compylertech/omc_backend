import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Privilege } from './entities/privileges.entity';
import { PrivilegesController } from './controller/privileges.controller';
import { PrivilegesService } from './services/privileges.service';

@Module({
  imports: [TypeOrmModule.forFeature([Privilege])],
  controllers: [PrivilegesController],
  providers: [PrivilegesService],
  exports: [PrivilegesService],
})
export class PrivilegesModule {}
