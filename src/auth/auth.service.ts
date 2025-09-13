/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserResponseDto> {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    }

    const user = await this.usersService.create(registerDto);
    const { password, ...result } = user.get({ plain: true });
    return result as UserResponseDto;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const passwordHash = user.getDataValue('password');

    if (!passwordHash) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, passwordHash);

    return isMatch ? user : null;
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ access_token: string; user: UserResponseDto }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.usersService.update(user.id, { lastLoginAt: new Date() });

    const payload = { email: user.email, sub: user.id, role: user.role };
    const { password, ...plainUser } = user.get({ plain: true });

    return {
      access_token: this.jwtService.sign(payload),
      user: plainUser as UserResponseDto,
    };
  }
}
