import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { RoleType } from 'src/utils/enums';
import { PageOptionsDto } from 'src/common/dto/page-optional.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { Role } from '../entities/role.entity';
import { UserRoleService } from 'src/modules/user_role/service/user_role.service';
import { RolePrivilegeService } from 'src/modules/role_privilege/service/role_privilege.service';

@ApiTags('Roles')
@Public()
@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly userRoleService: UserRoleService,
    private readonly rolePrivilegeService: RolePrivilegeService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            roleType: { type: 'string' },
            privileges: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        message: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  create(@Body() createRoleDto: CreateRoleDto) {
    const result = this.rolesService.create(createRoleDto);
    return {
      data: result,
      message: 'Role created successfully',
      code: 201,
    };
  }

  @Get()
  @ApiQuery({ name: 'searchKey', required: false, type: String })
  @ApiQuery({ name: 'roleType', required: false, enum: RoleType })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              roleType: { type: 'string' },
              privileges: { type: 'array', items: { type: 'string' } },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
        meta: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            perPage: { type: 'number' },
            totalItems: { type: 'number' },
            totalPages: { type: 'number' },
          },
        },
        message: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    schema: { type: 'object' },
  })
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('searchKey') searchKey?: string,
    @Query('roleType') roleType?: RoleType,
  ): Promise<{ data: PageDto<Role>; message: string; code: number }> {
    return this.rolesService
      .findAll(pageOptionsDto, searchKey, roleType)
      .then((result) => ({
        data: result,
        message: 'roles retrieved successfully',
        code: 200,
      }));
  }

  @Get('/list')
  @ApiQuery({ name: 'roleType', required: false, enum: RoleType })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              roleType: { type: 'string' },
              privileges: { type: 'array', items: { type: 'string' } },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
        message: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    schema: { type: 'object' },
  })
  findAllList(
    @Query('roleType') roleType?: RoleType,
  ): Promise<{ data: Role[]; message: string; code: number }> {
    return this.rolesService.findAllList(roleType).then((result) => ({
      data: result,
      message: 'roles retrieved successfully',
      code: 200,
    }));
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            roleType: { type: 'string' },
            privileges: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        message: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found.',
    schema: { type: 'object' },
  })
  findOne(@Param('id') id: string) {
    return this.rolesService
      .findOne(id)
      .then((result) => ({
        data: result,
        message: 'Role retrieved successfully',
        code: 200,
      }))
      .catch(() => ({
        data: null,
        message: 'Role not found',
        code: 404,
      }));
  }

  @Get('/user/:userId')
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              roleType: { type: 'string' },
              privileges: { type: 'array', items: { type: 'string' } },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
        message: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User roles not found.',
    schema: { type: 'object' },
  })
  async getUserRoles(@Param('userId') userId: string) {
    try {
      const result = await this.userRoleService.getUserRoles(userId);
      console.log('User ROLES', result);

      return {
        data: result,
        message: 'User roles retrieved successfully',
        code: 200,
      };
    } catch (error) {
      return {
        data: null,
        message: 'User roles not found',
        code: 404,
      };
    }
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            roleType: { type: 'string' },
            privileges: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        message: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found.',
    schema: { type: 'object' },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    schema: { type: 'object' },
  })
  update(@Param('id') id: string, @Body() updateRoleDto: CreateRoleDto) {
    return this.rolesService
      .update(id, updateRoleDto)
      .then((result) => ({
        data: result,
        message: 'Role updated successfully',
        code: 200,
      }))
      .catch(() => ({
        data: null,
        message: 'Role not found',
        code: 404,
      }));
  }

  @Get(':id/privileges')
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { type: 'string' },
        },
        message: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Role privileges not found.',
    schema: { type: 'object' },
  })
  async getRolePrivileges(@Param('id') id: string) {
    try {
      const result = await this.rolePrivilegeService.getRolePrivileges(id);
      return {
        data: result,
        message: 'Role privileges retrieved successfully',
        code: 200,
      };
    } catch (error) {
      return {
        data: null,
        message: 'Role privileges not found',
        code: 404,
      };
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
