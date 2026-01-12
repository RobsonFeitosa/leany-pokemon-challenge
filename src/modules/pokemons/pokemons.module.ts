import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonController } from './infra/http/controllers/pokemon.controller';
import { PokemonEntity } from './infra/database/entities/pokemon.entity';
import { TypeOrmPokemonRepository } from './infra/database/repositories/typeorm-pokemon.repository';
import { CreatePokemonUseCase } from './application/create-pokemon.use-case';
import { IndexPokemonUseCase } from './application/index-pokemon.use-case';
import { SyncPokemonUseCase } from './application/sync-pokemon.use-case';
import { SyncAllPokemonsUseCase } from './application/sync-all-pokemons.use-case';
import { FetchPokeApiProvider } from './infra/providers/poke-api/fetch-poke-api.provider';
import { PokemonsMessageBrokerController } from './infra/http/controllers/pokemons-message-broker.controller';
import { SyncPokemonsJob } from './infra/jobs/sync-pokemons.job';

@Module({
    imports: [
        TypeOrmModule.forFeature([PokemonEntity]),
    ],
    controllers: [PokemonController, PokemonsMessageBrokerController],
    providers: [
        CreatePokemonUseCase,
        IndexPokemonUseCase,
        SyncPokemonUseCase,
        SyncAllPokemonsUseCase,
        SyncPokemonsJob,
        {
            provide: 'PokemonRepository',
            useClass: TypeOrmPokemonRepository,
        },
        {
            provide: 'PokeApiProvider',
            useClass: FetchPokeApiProvider,
        },
    ],
    exports: ['PokemonRepository', 'PokeApiProvider'],
})
export class PokemonsModule { }
