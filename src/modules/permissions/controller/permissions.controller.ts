import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { PermissionsService } from '../services/permissions.service';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ApiBody({ type: CreatePermissionDto })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(id);
  }
}
