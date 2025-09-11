import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { clientsProviders } from './clients.providers';
import { ClientsService } from './clients.service';

@Module({
  providers: [ClientsService, ...clientsProviders],
  controllers: [ClientsController],
})
export class ClientsModule {}
