<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
</p>

# Conéctar API

API backend do projeto **Conéctar**, desenvolvida com **NestJS**, responsável pelo gerenciamento de usuários, autenticação e dados de clientes.

---

## Tecnologias

- Node.js
- NestJS
- SQLite (banco de dados local)
- Sequelize (ORM)

---

## Pré-requisitos

- Node.js >= 18
- npm ou Yarn

---

## Instalação

1. Clone este repositório para o seu ambiente local:

   ``bash`
   git clone <URL_DO_SEU_REPOSITORIO>
   cd <NOME_DO_SEU_PROJETO>

2. Instale todas as dependências do projeto:
   ``bash`
   npm install

### Configuração do Banco de Dados

Este projeto utiliza **SQLite** para um banco de dados local.

- O arquivo do banco de dados (`database.sqlite`) será criado automaticamente na raiz do projeto na primeira vez que você o iniciar.
- As tabelas do Sequelize serão sincronizadas automaticamente.

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto. É crucial para a segurança do JWT.

**`/.env`**

Substitua `suaChaveSecretaAqui` por uma string longa e aleatória.

## Rodando o Projeto

Para iniciar o servidor em modo de desenvolvimento, execute o seguinte comando:

``bash`
npm run start:dev

O servidor estará disponível em http://localhost:3000
