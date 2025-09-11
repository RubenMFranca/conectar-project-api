import { Sequelize } from 'sequelize-typescript';
import { Client } from '../clients/client.model';
import { User } from '../users/users.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'database.sqlite',
      });
      sequelize.addModels([User, Client]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
