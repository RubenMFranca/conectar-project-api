import { Client } from './client.model';

export const clientsProviders = [
  {
    provide: 'CLIENTS_REPOSITORY',
    useValue: Client,
  },
];
