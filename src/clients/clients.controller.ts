/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ClientsService } from './clients.service';
import { ClientDto } from './dto/client.dto';

@Controller('clients')
@UseGuards(AuthGuard('jwt'))
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @Roles('admin')
  @UseGuards(RolesGuard)
  async create(@Body() clientDto: ClientDto, @Req() req) {
    return this.clientsService.create(clientDto, req.user.id);
  }

  @Get()
  async findAll(@Req() req) {
    return this.clientsService.findAll(req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    return this.clientsService.findOne(parseInt(id), req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() clientDto: ClientDto,
    @Req() req,
  ) {
    return this.clientsService.update(parseInt(id), clientDto, req.user);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async delete(@Param('id') id: string, @Req() req) {
    return this.clientsService.delete(parseInt(id), req.user);
  }
}
