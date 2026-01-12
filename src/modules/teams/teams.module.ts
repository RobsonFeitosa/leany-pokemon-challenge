import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamController } from './infra/http/controllers/team.controller';
import { TeamEntity } from './infra/database/entities/team.entity';
import { TeamPokemonEntity } from './infra/database/entities/team-pokemon.entity';
import { TypeOrmTeamRepository } from './infra/database/repositories/typeorm-team.repository';
import { CreateTeamUseCase } from './application/create-team.use-case';
import { IndexTeamUseCase } from './application/index-team.use-case';
import { AddPokemonToTeamUseCase } from './application/add-pokemon-to-team.use-case';
import { PokemonsModule } from '../pokemons/pokemons.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TeamEntity, TeamPokemonEntity]),
        PokemonsModule,
    ],
    controllers: [TeamController],
    providers: [
        CreateTeamUseCase,
        IndexTeamUseCase,
        AddPokemonToTeamUseCase,
        {
            provide: 'TeamRepository',
            useClass: TypeOrmTeamRepository,
        },
    ],
    exports: ['TeamRepository'],
})
export class TeamsModule { }
