# API - VUTTR (Very Useful Tools to Remember)

## O que é

Este projeto tem como objetivo atender ao desafio proposto pela BossaBox, onde foi solicitado o desenvolvimento de uma API para a aplicação VUTTR (Very Useful Tools to Remember).

Decidi realizar em NodeJs, com Express e banco de dados MongoDB. Abaixo pode ser visto mais detalhes sobre as bibliotecas utilizadas.

## Quais tecnologias foram utilizadas

A API foi desenvolvida utilizando Node e Express, juntamente com o banco de dados MongoDB. O código foi desenvolvido em Typescript utilizando as praticas de TDD com Jest e testes unitários e end-to-end.

O projeto utiliza as ferramentas do Github Workflows para CI (Continuous Integration) e configurações em Docker e Docker Compose.

## 📦️ Como baixar e executar o projeto

Para baixar o projeto

```bash
# Clone do repositório
$ git clone https://github.com/sobucki/api-bossa-tools.git

# Entrar no repositório
$ cd api-bossa-tools
```

Pode ser executado de duas maneiras. Utilizando Docker Compose ou com manualmente com Node.

Opção 1 - Docker Compose:

```bash
# Iniciar os containers em modo detached
$ docker-compose up -d
```

Opção 2 - Iniciando o Node

```bash
# Iniciando o processo de compilação e execução da aplicação
$ npm start
```

Para este passo é necessário ter o MongoDB instalado ou levantar uma imagem Docker antes de iniciar a aplicação.

## Sobre a aplicação

A aplicação tem por finalidade o cadastro de ferramentas úteis para um usuário.
O usuário para realizar o cadastro dessas ferramentas, precisa primeiramente possuir uma conta com e-mail e senha.
Após a autenticação feita pelo usuário, ele poderá cadastrar e deletar suas ferramentas.
A listagem das ferramentas não necessita de autenticação, podendo exibir assim, todas as ferramentas cadastradas no sistema.

## Requisitos necessários para atender

- [x] Toda a aplicação é exposto na porta 3000
- [x] Rota para listagem de todas ferramenta cadastradas GET /tools
- [x] Possibilidade de filtragem por tag na rota de listagem GET /tools?tag=node
- [x] Para realização de cadastro e remoção de ferramentas é necessário autenticação
- [x] Cadastro de usuário POST /users
- [x] Autenticação de usuário POST /authenticate
- [x] Atualização de token GET /me
- [x] Cadastro de novas ferramentas POST /tools (somente com autenticação)
- [x] Remoção de uma ferramenta DELETE /tools/:id (semente com autenticação e a ferramenta criada pelo usuário)
- [x] Testes unitários
- [x] Testes de integração (end-to-end)
- [x] Utilização de ESLint, Prettier
- [x] Conteinerização da aplicação
- [x] Autenticação JWT
- [x] Pipeline CI com Github Workflows
- [x] Deploy em ambiente real utilizando Digital Ocean
- [x] Documentação com OpenAPI (Swagger)

## API REST

### Autenticação

### POST /users

```json
{
  "name": "John Doe",
  "email": "john@mail.com",
  "password": "12345#@$%"
}
```

### POST /authenticate

```json
{
  "email": "john@mail.com",
  "password": "12345#@$%"
}
```

### GET /me

| Parametro        | Tipo     | Obrigatório | Descrição |
| :--------------- | :------- | :---------- | :-------- |
| `x-access-token` | `header` | **Sim**     | Token JWT |

Resposta

```json
{
  "user": {
    "name": "John Doe",
    "email": "john@mail.com",
    "password": "12345#@$%",
    "id": "5f9b3c3178bb7fcf2d98c49d"
  }
}
```

### Tools

GET /tools
Filtro opcional
Query-params
Exemplo:/tools?tag=node&tag=web

Resposta

```json
[
  {
    "id": "5f9b3c3178bb7fcf2d98c49d",
    "title": "Exemple of title",
    "link": "http://sometool.com/",
    "description": "This is a description of the tool. Here will be detailing most about the software related.",
    "tags": ["Utility"]
  }
]
```

POST /tools

| Parametro        | Tipo     | Obrigatório | Descrição |
| :--------------- | :------- | :---------- | :-------- |
| `x-access-token` | `header` | **Sim**     | Token JWT |

```json
{
  "title": "Exemple of title",
  "link": "http://sometool.com/",
  "description": "This is a description of the tool. Here will be detailing most about the software related.",
  "tags": ["Utility"]
}
```

Resposta

```json

  "id": "5f9b3c3178bb7fcf2d98c49d",
  "title": "Exemple of title",
  "link": "http://sometool.com/",
  "description": "This is a description of the tool. Here will be detailing most about the software related.",
  "tags": [
    "Utility"
  ]
}
```

DELETE /tools/:id

| Parametro        | Tipo     | Obrigatório | Descrição        |
| :--------------- | :------- | :---------- | :--------------- |
| `x-access-token` | `header` | **Sim**     | Token JWT        |
| `id`             | `path`   | **Sim**     | Id da ferramenta |

Exemplo:

```hml
DELETE /tools/5fa060b235cf6e710f3ff3aa
```

Resposta
Código 204
