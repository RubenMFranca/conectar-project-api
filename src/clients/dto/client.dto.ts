import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ClientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
