import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ClientDto {
  @IsNotEmpty()
  @IsString()
  nomeFachada!: string;

  @IsNotEmpty()
  @IsString()
  cnpj!: string;

  @IsOptional()
  @IsString()
  razaoSocial!: string;

  @IsOptional()
  @IsString()
  status!: string;

  @IsOptional()
  @IsString()
  tag!: string;

  @IsOptional()
  @IsBoolean()
  conecta_plus!: boolean;
}
