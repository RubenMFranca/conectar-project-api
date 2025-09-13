import { IsOptional, IsString } from 'class-validator';

export class FindAllClientsDto {
  @IsOptional()
  @IsString()
  nomeFachada?: string;

  @IsOptional()
  @IsString()
  cnpj?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  razaoSocial?: string;
}
