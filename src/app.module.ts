import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';

// imports: [UsersModule, UserRoleModule, RolesModule, FilesModule, FuelStationsModule, FuelStationTransactionModule, RolePermissionModule, FuelStationServiceModule, ServicesModule, PermissionsModule],

@Module({
  imports: [
    // Load environment variables and configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),

    // TypeORM configuration using ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
