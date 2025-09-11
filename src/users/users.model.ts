import { Column, DataType, Model, Table, Unique } from 'sequelize-typescript';

@Table({
  timestamps: true,
  // hooks: {
  //   beforeUpdate: async (user: User) => {
  //     if (user.changed('password') && user.password) {
  //       user.password = await bcrypt.hash(user.password, 10);
  //     }
  //   },
  // },
})
export class User extends Model {
  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  role!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  lastLoginAt!: Date;
}
