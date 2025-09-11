import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../users/users.model';
import { Client } from './client.model';
import { ClientDto } from './dto/client.dto';

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

  async findAll(user: User): Promise<Client[]> {
    if (user.role === 'admin') {
      return this.clientsRepository.findAll<Client>();
    }
    return this.clientsRepository.findAll<Client>({
      where: { assignedToUserId: user.id },
    });
  }

  async findOne(id: number, user: User): Promise<Client> {
    const client = await this.clientsRepository.findByPk<Client>(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    if (user.role !== 'admin' && client.assignedToUserId !== user.id) {
      throw new NotFoundException('Client not found or you do not have access');
    }
    return client;
  }

  async update(
    id: number,
    clientDto: ClientDto,
    user: User,
  ): Promise<[number]> {
    const client = await this.findOne(id, user);
    return this.clientsRepository.update(clientDto, {
      where: { id: client.id },
    });
  }

  async delete(id: number, user: User): Promise<number> {
    const client = await this.findOne(id, user);
    return this.clientsRepository.destroy({ where: { id: client.id } });
  }
}
