# 🚀 Backend – NestJS + Socket.IO (Clean Architecture)

Backend de um chat em tempo real desenvolvido com **NestJS**, **Socket.IO** e **TypeScript**, aplicando princípios de **Arquitetura Limpa** para garantir escalabilidade e manutenibilidade.

## ✨ Funcionalidades

- 💬 **Comunicação em Tempo Real**: Envio e recebimento de mensagens instantâneas via WebSockets.
- 🏘️ **Gestão de Salas**: Criação e organização de salas de conversa.
- ⚡ **Performance com SWC**: Compilação e execução de testes ultra-rápidos com Rust.
- 📝 **Documentação Swagger**: API documentada e testável via `/docs`.
- 🔒 **CORS Configurado**: Pronto para integração com frontends em diferentes origens.
- 🧪 **Testes & Cobertura**: Suite de testes com Jest e SWC para feedback instantâneo.
- 🗄️ **Persistência Robusta**: Integração com PostgreSQL via TypeORM.

---

## 🏗️ Arquitetura do Projeto

O projeto segue os padrões de **Clean Architecture** e **Domain-Driven Design (DDD)**, organizando as responsabilidades de forma clara:

### `src/app` (Camada de Domínio e Aplicação)
- **Entities**: Definição dos objetos de negócio (Chat, Room, User).
- **Use Cases**: Regras de negócio e fluxos da aplicação (Ex: `CreateChat`, `CreateRoom`).
- **Repositories**: Interfaces que definem como os dados devem ser persistidos.

### `src/infra` (Camada de Infraestrutura)
- **http/**: Controllers, DTOs e gerenciamento de rotas REST.
- **ws/**: Gateways de WebSocket (`ChatGateway`) para comunicação em tempo real.
- **database/**: Implementações concretas do TypeORM, entidades de banco e migrations.

### `src/helpers`
- Utilitários compartilhados e lógicas transversais.

---

### `Estrutura do projeto`

```bash
src/
├── modules/
│   └── [domain-name]/               
│       ├── domain/                  
│       │   ├── entities/            
│       │   ├── repositories/        
│       │   ├── errors/              
│       │   └── types/               
│       ├── application/             
│       │   └── use-cases/           
│       ├── infra/                   
│       │   ├── http/
│       │   │   ├── controllers/     
│       │   │   ├── dtos/            
│       │   │   └── types/           
│       │   ├── database/            
│       │   │   ├── entities/        
│       │   │   └── repositories/    
│       │   ├── mappers/             
│       │   └── providers/           
│       └── [domain-name].module.ts  
│
├── shared/                          
│   ├── domain/                      
│   │   ├── errors/                  
│   │   ├── types/                   
│   │   └── helpers/                 
│   └── infra/                       
│       ├── http/
│       │   ├── guards/              
│       │   ├── interceptors/        
│       │   └── filters/             
│       ├── providers/               
│       ├── database/
│       │   └── migrations/          
│       └── ws/                      
│
├── app.module.ts                    
└── main.ts                          
```
──

## 🛠️ Tecnologias Principais

- **NestJS** (v11)
- **Socket.IO** (v4)
- **TypeScript**
- **TypeORM** & **PostgreSQL**
- **SWC** (Compiler)
- **Docker** & **Docker Compose**

---

## � Como Iniciar

### Pré-requisitos

- **Node.js** >= 20
- **Docker** & **Docker Compose** (Opcional, para ambiente isolado)

### Instalação e Execução Local

1. **Instale as dependências:**
   ```bash
   yarn install
   # ou
   npm install
   ```

2. **Configure o ambiente:**
   Copie `.env.example` para `.env` e ajuste as credenciais do banco de dados.

3. **Inicie o servidor (Desenvolvimento):**
   ```bash
   yarn dev
   ```
   O servidor estará disponível em: `http://localhost:3333`

---

## � Rodando com Docker

### Docker Compose (Recomendado)

Para subir o banco de dados e a aplicação:

```bash
docker-compose up -d --build
```

---

## 📡 WebSocket – Eventos Principais

O gateway de chat está disponível para conexões via Socket.IO.

### Inscrição (Subscribe)
- `newMessage`: Recebe um payload contendo o tipo da entidade (Chat ou Room), o ID do usuário e o corpo da mensagem ou sala.

### Emissão (Emit)
- `onMessage`: Notifica os clientes sobre a chegada de novas mensagens ou atualizações.

---

## 🏗️ Estrutura de Times

A modelagem de Times segue regras estritas de associação:

- **Quantidade Limite**: Um Time pode ter entre **1 e 5 Pokémon**. Tentativas de adicionar mais de 5 são rejeitadas com erro apropriado.
- **Vínculo com Treinador**: Cada Time está obrigatoriamente vinculado a um único Treinador (`trainer_id`).
- **Associação de Pokémon**: A relação entre Times e Pokémon é de **Muitos-para-Muitos**, mas implementada através de uma entidade de associação explícita chamada `TeamPokemon`. 
- **Entidade de Associação (`TeamPokemon`)**: Esta estrutura permite rastrear quando um Pokémon foi adicionado ao time e garante que a mesma instância de Pokémon não seja duplicada no mesmo time (através de restrições de unicidade no banco de dados e validação no Use Case).

---

## 🛡️ Regras de Negócio - Exclusão e Sincronização

### Exclusão (Soft Delete)
- **Soft Delete em Cascata**: Ao excluir um Treinador, o sistema aplica um "Soft Delete" (exclusão lógica) tanto no registro do Treinador quanto em todos os seus Times associados.
- **Persistência de Dados**: Os registros permanecem no banco de dados com a coluna `deleted_at` preenchida, garantindo histórico e integridade referencial.
- **Associações**: Quando um Time é removido, suas associações na tabela `team_pokemons` permanecem vinculadas ao registro inativo do time.

### Sincronização com PokéAPI (Local-First)
- **Prioridade Local**: Ao criar um time informando nomes ou IDs da PokéAPI, o sistema primeiro verifica se o Pokémon já existe no banco local.
- **Sync On-Demand**: Se o Pokémon não existir localmente, o sistema busca os dados na PokéAPI, persiste-os no banco local e então realiza a associação com o time.
- **Sincronização Manual**: A PokéAPI é consultada apenas se o dado for inexistente localmente ou se uma sincronização manual/agendada for acionada.

---

## 🧪 Testes e Qualidade

O projeto utiliza **SWC** para garantir que os testes rodem em milissegundos.

```bash
# Rodar todos os testes
yarn test

# Ver cobertura de código
yarn test:cov
```

---

## 🔌 Integrações Externas

O sistema consome dois serviços externos principais para enriquecer a experiência e garantir a consistência dos dados:

### 1. PokéAPI
Utilizada para obter dados oficiais de Pokémon (ID, Nome, Imagem, Tipos).
- **Busca**: Realizada via `SyncPokemonUseCase`. O sistema busca por Nome ou ID.
- **Gravação**: Os dados obtidos são persistidos no banco local (`pokemons`) para consultas futuras ultrarrápidas.
- **Reutilização (Cache)**: Implementamos uma estratégia **Local-First**. Antes de consultar a PokéAPI, o sistema verifica se o Pokémon já existe localmente. A API externa é consultada apenas se o dado for inexistente ou se for solicitada uma atualização explícita.

### 2. Serviço de CEP (ViaCEP)
Utilizado para validar e enriquecer os dados de endereço dos Treinadores.
- **Fluxo de Dados**: Disponibilizamos um serviço interno (`CepService` / `GetCepAddressUseCase`) que consome a API do ViaCEP.
- **Uso**: O frontend ou consumidor da API pode consultar o endereço completo a partir de um CEP via endpoint `GET /trainers/address/:cep`.
- **Persistência**: Os dados de endereço (logradouro, bairro, cidade, estado) são persistidos junto ao registro do Treinador no banco de dados, garantindo que a informação esteja disponível mesmo se o serviço externo estiver instável.

---

## 📖 Documentação da API

Acesse o Swagger UI para explorar os endpoints REST:
🔗 [http://localhost:3333/docs](http://localhost:3333/docs)

---

## 👤 Autor

**Robson Feitosa**

---

## 📄 Licença

Este projeto está sob a licença [MIT](https://github.com/nestjs/nest/blob/master/LICENSE).
