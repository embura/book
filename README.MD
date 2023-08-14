# FarmáciasAPP Backend Boilerplate

Este projeto traz boas práticas para a construção de novos módulos de micro-serviços, com o intuito de uma padronização, melhor manutenabilidade e disseminação da cultura de testes automatizados.

## Design

Foi aplicado o design de arquitetura "Clean Architecture", pois facilita a separação do negócio (core) das regras de infraestrutura (frameworks, clouds, etc).

<img src="./docs/images/clean-architecture.png" alt="drawing" width="400"/>

A camada externa acessa a camada interna, utilizando a injeção de dependência, é possível isolar o core da aplicação dos frameworks utilizados.

Dentro do diretório `src` possuem 3 diretórios principais (domain, infra e main), além do diretório utils.

### Domain

Este diretório deve carregar somente o core da aplicação, como os UseCases, entidades de negócio e interfaces de repositório.

Para este exemplo, cada usecase foi colocado em um diretório distinto, para agrupar com os dominios de input/output e tornar mais limpo a visualização.

Cada usecase deve possuir apenas uma função pública, para que ele não acabe incorporando mais função que o necessário, desta forma facilita a manutenção e criação do teste do mesmo.

## Infra

Neste diretório temos tudo que se enquadra a infra, como conexão com banco de dados, definição de rotas, consumidor de filas, etc.

Desta forma, dentro desse diretório separei alguns diretórios para facilitar a visualização, sendo eles:

- controllers: Faz a ponte entre o handle principal e os usecases, como exemplo a definição de rotas, consumidor de fila ou uma interface de console.
- gateways: Implementação de cada repositório de dados definidos em domains
- helpers: (Opcional) Classes que facilitam a utilização de recursos de infra dentro dos gateways ou controllers. Geralmente devem ser movidos para libs após pouco tempo.
- services: Utilizar apenas quando houver a necessidade de executar uma sequencia de Usecases em uma mesma transação.

## Main

Este diretório contem os handlers de inicialização do projeto, sejam um listen do servidor http, um handle lambda ou uma UI para console.

## utils

Este diretório deve ser usado com moderação da mesma forma que o helpers, pensando sempre em mover para libs, porém fica disponivel tanto para domains, quanto para infra.


[swagger](docs/openapi.yml)

#
### Endpoints da API
##### Os seguintes endpoints estão disponíveis nesta API:

- Criar Livro
	- Endpoint: `POST /api/private/v1/book`
	- Descrição: Criar um novo registro de livro.
	- Corpo da Requisição: `Esquema BookInput`
	- Resposta: 200 OK em caso de criação bem-sucedida, 401 Não Autorizado, 500 Erro Interno do Servidor

- Obter Livro por ID
	- Endpoint: `GET /api/private/v1/book/{bookId}`
	- Descrição: Recuperar detalhes de um livro pelo seu ID.
	- Parâmetro de Caminho: `bookId` (string) - O identificador único do livro.
	- Resposta: 200 OK com detalhes do livro, 401 Não Autorizado, 404 Livro Não Encontrado

- Atualizar Livro por ID
	-  Endpoint: `PUT /api/private/v1/book/{bookId}`
	-  Descrição: Atualizar um registro de livro existente.
	-  Parâmetro de Caminho: `bookId` (string) - O identificador único do livro.
	-  Corpo da Requisição: Esquema `BookInput`
	-  Resposta: 200 OK em caso de atualização bem-sucedida, 401 Não Autorizado, 404 Livro Não - Encontrado

- Excluir Livro por ID
	- Endpoint: `DELETE /api/private/v1/book/{bookId}`
	- Descrição: Excluir um registro de livro pelo seu ID.
	- Parâmetro de Caminho: `bookId` (string) - O identificador único do livro.
	- Resposta: 204 Sem Conteúdo em caso de exclusão bem-sucedida, 401 Não Autorizado, 404 Livro Não Encontrado

- Alugar Livro
	-  Endpoint: `POST /api/private/v1/book/{bookId}/rent`
	-  Descrição: Alugar um livro para um usuário.
	-  Parâmetro de Caminho: `bookId` (string) - O identificador único do livro.
	-  Corpo da Requisição: `{ "userId": "string" }`
	- Resposta: 200 OK em caso de aluguel bem-sucedido, 401 Não Autorizado, 404 Livro Não Encontrado

- Buscar Livros
	- Endpoint: GET /api/private/v1/book?search=description
	- Descrição: Buscar livros com base em uma descrição.
	- Parâmetro de Consulta: `search` (string) - A palavra-chave de busca.
	- Resposta: Lista de livros que correspondem aos critérios de busca, 401 Não Autorizado

#### Esquemas
##### Esquema BookInput
O esquema `BookInput` representa a estrutura de um objeto de livro usado para criar e atualizar registros de livros. Possui as seguintes propriedades:

	- title (string): O título do livro.
	- author (string): O autor do livro.
	- gender (string): O gênero do livro.
	- hasAudio (boolean): Se o livro possui áudio disponível.
	- description (string): Uma descrição do livro.
	- createdAt (string, formato: date-time): O carimbo de data/hora quando o livro foi criado.
	- updatedAt (string, formato: date-time): O carimbo de data/hora quando o livro foi atualizado.
#
# Iniciando o projeto

Este projeto pode ser utilizado tanto com yarn quanto npm, porém os exemplos serão apresentados utilizando yarn como o gerenciador padrão.

Projeto pensado para ser executado em lambda


Primeiro instale as dependências:

```
yarn
```


Inicia aplicação

```
yarn start:lambda
```

subir container do mongo e seu client web:

```
docker compose -f mongo.yml up -d
```


#
Testes:

```shell
yarn test:unit

yarn test:integration

yarn test:cov
```
#




