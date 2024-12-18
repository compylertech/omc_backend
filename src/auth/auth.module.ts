import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { User } from 'src/modules/users/entities/user.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/modules/users/users.module';
import { RolesModule } from 'src/modules/roles/roles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserRole } from 'src/modules/user_role/entities/user_role.entity';
import { UserRoleModule } from 'src/modules/user_role/user_role.module';
import { RolePrivilege } from 'src/modules/role_privilege/entities/role_privilege.entity';
import { RolePrivilegeModule } from 'src/modules/role_privilege/role_privilege.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, UserRole, RolePrivilege]),
    UsersModule,
    RolesModule,
    UserRoleModule,
    RolePrivilegeModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
