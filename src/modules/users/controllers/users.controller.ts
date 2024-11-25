import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PageOptionsDto } from 'src/common/dto/page-optional.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { User } from '../entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Get()
  // findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
  //   return this.usersService.findAll(pageOptionsDto);
  // }
  @Get()
  @ApiQuery({ name: 'searchKey', required: false, type: String })
  @ApiQuery({ name: 'userType', required: false, type: Boolean })
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    searchKey?: string,
    userType?: boolean,
  ): Promise<PageDto<User>> {
    return this.usersService.findAll(pageOptionsDto, searchKey, userType);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // @Get('email/:email')
  // findByEmail(@Param('email') email: string) {
  //   return this.usersService.findByEmail(email);
  // }
}
