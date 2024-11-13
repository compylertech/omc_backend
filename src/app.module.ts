import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserRoleModule } from './user_role/user_role.module';
import { RolesModule } from './roles/roles.module';
import { FilesModule } from './files/files.module';
import { FuelStationsModule } from './fuel_stations/fuel_stations.module';
import { FuelStationTransactionModule } from './fuel_station_transaction/fuel_station_transaction.module';
import { RolePermissionModule } from './role_permission/role_permission.module';
import { FuelStationServiceModule } from './fuel_station_service/fuel_station_service.module';
import { ServicesModule } from './services/services.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [UsersModule, UserRoleModule, RolesModule, FilesModule, FuelStationsModule, FuelStationTransactionModule, RolePermissionModule, FuelStationServiceModule, ServicesModule, PermissionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
