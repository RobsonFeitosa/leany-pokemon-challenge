# 🚀 Backend – Pokémon Challenge (Clean Architecture)

Backend desenvolvido com **NestJS** e **TypeScript**, aplicando princípios de **Arquitetura Limpa** e **DDD** para gerenciar treinadores, times e pokémons com integracões externas.

## ✨ Funcionalidades

- 🗂️ **Gestão de Treinadores**: Cadastro completo com enriquecimento automático de endereço via ViaCEP.
- 🛡️ **Gestão de Times**: Criação de times com limite de 5 pokémons e regras de integridade.
- 🐱‍👤 **Integração PokéAPI**: Sincronização automática de dados de pokémons diretamente da API oficial.
- ⚡ **Performance com SWC**: Compilação e execução de testes ultra-rápidos com Rust.
- 📝 **Documentação Swagger**: API documentada e testável via `/api`.
- 🧪 **Testes & Cobertura**: Suite de testes com Jest e feedback instantâneo.
- 🗄️ **Persistência Robusta**: Integração com PostgreSQL via TypeORM e suporte a Migrations.

---

## 🏗️ Arquitetura do Projeto

O projeto segue os padrões de **Clean Architecture** e **Domain-Driven Design (DDD)**, organizando as responsabilidades de forma clara.

## 🛠 Decisões de Arquitetura (Nível Sênior)

* **Clean Architecture:** Divisão clara entre `Domain` (Regras), `Application` (Casos de Uso) e `Infrastructure` (Frameworks/DB).
* **Isolamento de Entidades:** Uso de **Mappers** para garantir que as entidades do TypeORM não vazem para os Controllers. A API trafega apenas **DTOs** e utiliza entidades de domínio puro internamente.
* **Repository Pattern:** Desacoplamento total da lógica de persistência, facilitando a troca de banco de dados ou a implementação de testes unitários com Mocks.
* **Performance com SWC:** Configuração do compilador SWC para garantir que o ciclo de desenvolvimento (Hot Reload) e a execução de testes sejam extremamente rápidos.

---

---

### `Estrutura do projeto`

```bash
src/
├── modules/
│   └── [module-name]/               
│       ├── domain/                  
│       │   ├── entities/            
│       │   ├── repositories/        
│       │   └── providers/ (interfaces)
│       ├── application/             
│       └── infra/                   
│           ├── http/
│           │   ├── controllers/     
│           │   └── dtos/            
│           ├── database/            
│           │   ├── entities/        
│           │   └── repositories/    
│           ├── providers/           
│           └── jobs/                
│
├── shared/                          
│   ├── domain/                      
│   └── infra/                       
│       ├── http/
│       │   ├── filters/             
│       │   ├── interceptors/        
│       │   └── providers/           
│       └── database/
│           ├── migrations/          
│           └── base.mapper.ts       
│
├── app.module.ts                    
└── main.ts                          
```
──

## 🛠️ Tecnologias Principais

- **NestJS** (v11)
- **TypeScript**
- **TypeORM** & **PostgreSQL**
- **SWC** (Compiler)
- **RabbitMQ** (Message Broker)
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

---

---

## 📋 Regras de Negócio Implementadas

### 1. Treinador (Trainers)
* **Enriquecimento com ViaCEP:** No cadastro, o sistema consome a API externa do ViaCEP para preencher automaticamente endereço, bairro, cidade e estado. Isso garante padronização e qualidade nos dados de localização.
* **Restrição de Exclusão (Restrict Delete):** Para manter a integridade referencial, o sistema bloqueia a exclusão de treinadores que possuam times ativos. O usuário deve gerenciar os times antes de remover o perfil.
* **Persistência Segura (Soft Delete):** A remoção de treinadores e times utiliza a estratégia de *Soft Delete* (`deleted_at`). Os dados não são apagados fisicamente, permitindo auditoria e evitando perda acidental de histórico.

### 2. Times (Teams)
* **Limite de Composição:** Cada time pode ter no máximo **5 Pokémon**. O sistema rejeita automaticamente a tentativa de adicionar um 6º integrante com erro `400 Bad Request`.
* **Prevenção de Duplicidade:** É proibido adicionar o mesmo Pokémon mais de uma vez no mesmo time. Essa regra é validada na camada de aplicação e reforçada por uma *Unique Constraint* no banco de dados.
* **Vínculo Obrigatório:** Um time não pode existir sem um treinador responsável (Dono).

### 3. Pokémon & PokéAPI (Cache Strategy)
* **Estratégia Cache-Aside:** A aplicação prioriza o banco de dados local. Caso o Pokémon solicitado não exista na base, o sistema busca na PokéAPI, persiste os dados localmente (nome, tipos, imagem, ID externo) e então realiza a associação ao time.
* **Redução de Latência:** O uso do cache local evita chamadas desnecessárias à API externa em todas as requisições, tornando a listagem de times significativamente mais rápida.
* **Normalização de Dados:** Buscas por nome de Pokémon são tratadas como *case-insensitive*, garantindo que "Pikachu" e "pikachu" sejam reconhecidos como o mesmo registro, evitando redundância.

---

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
