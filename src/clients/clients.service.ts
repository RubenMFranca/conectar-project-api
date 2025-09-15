/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import Op from 'sequelize/lib/operators';
import { User } from '../users/users.model';
import { Client } from './client.model';
import { ClientDto } from './dto/client.dto';
import { FindAllClientsDto } from './dto/find-all-clients.dto';

@Injectable()
export class ClientsService {
  constructor(
    @Inject('CLIENTS_REPOSITORY')
    private clientsRepository: typeof Client,
  ) {}

  async create(
    clientDto: ClientDto,
    assignedToUserId: number,
  ): Promise<Client> {
    return this.clientsRepository.create<Client>({
      ...clientDto,
      assignedToUserId,
    });
  }

  async findAll(user: User, query?: FindAllClientsDto): Promise<Client[]> {
    const whereCondition: any = {};

    if (query?.nomeFachada) {
      whereCondition.nomeFachada = { [Op.like]: `%${query.nomeFachada}%` };
    }

    if (query?.cnpj) {
      whereCondition.cnpj = { [Op.like]: `%${query.cnpj}%` };
    }

    if (query?.status) {
      whereCondition.status = query.status;
    }

    if (query?.razaoSocial) {
      whereCondition.razaoSocial = { [Op.like]: `%${query.razaoSocial}%` };
    }

    if (user.role !== 'admin') {
      whereCondition.assignedToUserId = user.id;
    }

    return this.clientsRepository.findAll<Client>({ where: whereCondition });
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientsRepository.findByPk<Client>(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  async update(id: number, clientDto: ClientDto): Promise<[number]> {
    const client = await this.findOne(id);
    return this.clientsRepository.update(clientDto, {
      where: { id: client.id },
    });
  }

  async delete(id: number): Promise<number> {
    const client = await this.findOne(id);
    return this.clientsRepository.destroy({ where: { id: client.id } });
  }
}
