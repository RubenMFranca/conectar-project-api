import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';

@Table({
  timestamps: true,
})
export class Client extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nomeFachada!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cnpj!: string;

  @Column({
    type: DataType.STRING,
  })
  razaoSocial!: string;

  @Column({
    type: DataType.STRING,
  })
  status!: string;

  @Column({
    type: DataType.STRING,
  })
  tag!: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  conecta_plus!: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  assignedToUserId!: number;

  @BelongsTo(() => User)
  assignedToUser!: User;
}
