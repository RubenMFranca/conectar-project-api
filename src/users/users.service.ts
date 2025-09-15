import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { UserDto } from './dto/user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    const userData = { ...userDto };

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    return this.usersRepository.create(userData);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne<User>({
      where: { email },
      attributes: [
        'id',
        'name',
        'email',
        'password',
        'role',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findByPk(id);
  }

  async findAll(options: {
    role?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }): Promise<User[]> {
    const whereClause: { [key: string]: any } = {};
    const orderClause: any[] = [];

    if (options.role) {
      whereClause.role = options.role;
    }

    if (options.sortBy) {
      orderClause.push([options.sortBy, options.order || 'asc']);
    }

    return this.usersRepository.findAll<User>({
      where: whereClause,
      order: orderClause,
    });
  }

  async update(id: number, userDto: UserDto): Promise<[number, User[]]> {
    return this.usersRepository.update(userDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    return this.usersRepository.destroy({ where: { id } });
  }

  async findInactiveUsers(): Promise<User[]> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return this.usersRepository.findAll<User>({
      where: {
        lastLoginAt: {
          [Op.lt]: thirtyDaysAgo,
        },
      },
    });
  }
}
