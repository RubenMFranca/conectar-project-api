/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('admin')
  @UseGuards(RolesGuard)
  async findAll(
    @Query('role') role: string,
    @Query('sortBy') sortBy: string,
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.usersService.findAll({ role, sortBy, order });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.usersService.findById(parseInt(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userDto: UserDto, @Req() req) {
    if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.usersService.update(parseInt(id), userDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async delete(@Param('id') id: string) {
    return this.usersService.delete(parseInt(id));
  }

  @Get('notifications/inactive')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async findInactiveUsers() {
    return this.usersService.findInactiveUsers();
  }
}
