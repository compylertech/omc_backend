import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreatePrivilegeDto } from '../dto/create-privilege.dto';
import { PrivilegesService } from '../services/privileges.service';

@ApiTags('Privileges')
// @ApiBearerAuth()
@Controller('privileges')
export class PrivilegesController {
  constructor(private readonly privilegesService: PrivilegesService) {}

  @Post()
  @ApiBody({ type: CreatePrivilegeDto })
  create(@Body() createPrivilegeDto: CreatePrivilegeDto) {
    return this.privilegesService.create(createPrivilegeDto);
  }

  @Get()
  findAll() {
    return this.privilegesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.privilegesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.privilegesService.remove(id);
  }
}
