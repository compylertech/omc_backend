import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { PrivilegesModule } from './modules/privileges/privileges.module';
import { RolePrivilegeModule } from './modules/role_privilege/role_privilege.module';
import { UserRoleModule } from './modules/user_role/user_role.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './modules/services/services.module';
import { FuelStationsModule } from './modules/fuel_stations/fuel_stations.module';
import { FuelStationServiceModule } from './modules/fuel_station_service/fuel_station_service.module';
import { FuelStationTransactionModule } from './modules/fuel_station_transaction/fuel_station_transaction.module';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    PrivilegesModule,
    RolesModule,
    RolePrivilegeModule,
    UserRoleModule,
    ServicesModule,
    FuelStationsModule,
    FuelStationServiceModule,
    FuelStationTransactionModule,
    AuthModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
