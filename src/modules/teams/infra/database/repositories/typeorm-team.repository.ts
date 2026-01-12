import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team as TeamDomain } from "src/modules/teams/domain/entities/team.entity";
import { TeamRepository } from "src/modules/teams/domain/repositories/team.repository";
import { TeamEntity } from '../entities/team.entity';
import { TeamPokemonEntity } from '../entities/team-pokemon.entity';
import { BaseMapper } from 'src/shared/infra/database/base.mapper';

@Injectable()
export class TypeOrmTeamRepository implements TeamRepository {
    constructor(
        @InjectRepository(TeamEntity)
        private readonly ormRepo: Repository<TeamEntity>,
        @InjectRepository(TeamPokemonEntity)
        private readonly teamPokemonRepo: Repository<TeamPokemonEntity>
    ) { }

    async create(team: TeamDomain): Promise<TeamDomain> {
        const { pokemons, ...teamData } = team.toJSON();

        const entity = BaseMapper.toPersistence(teamData, TeamEntity);
        const saved = await this.ormRepo.save(entity);

        if (pokemons && pokemons.length > 0) {
            const teamPokemons = pokemons.map(pokemonId => {
                const tp = new TeamPokemonEntity();
                tp.team_id = saved.id;
                tp.pokemon_id = pokemonId;
                return tp;
            });
            await this.teamPokemonRepo.save(teamPokemons);
        }

        return this.findById(saved.id) as Promise<TeamDomain>;
    }

    async findById(id: string): Promise<TeamDomain | null> {
        const entity = await this.ormRepo.findOne({
            where: { id },
            relations: ['teamPokemons', 'teamPokemons.pokemon']
        });

        if (!entity) return null;

        const teamJSON = {
            id: entity.id,
            name: entity.name,
            trainer_id: entity.trainer_id,
            pokemons: entity.teamPokemons?.map(tp => tp.pokemon) || []
        };

        return BaseMapper.toDomain(teamJSON, TeamDomain);
    }

    async findAllByTrainerId(trainerId: string): Promise<TeamDomain[]> {
        const entities = await this.ormRepo.find({
            where: { trainer_id: trainerId },
            relations: ['teamPokemons', 'teamPokemons.pokemon']
        });

        return entities.map(entity => {
            const teamJSON = {
                id: entity.id,
                name: entity.name,
                trainer_id: entity.trainer_id,
                pokemons: entity.teamPokemons?.map(tp => tp.pokemon) || []
            };
            return BaseMapper.toDomain(teamJSON, TeamDomain);
        });
    }

    async save(team: TeamDomain): Promise<TeamDomain> {
        const { pokemons, ...teamData } = team.toJSON();
        const entity = BaseMapper.toPersistence(teamData, TeamEntity);
        const saved = await this.ormRepo.save(entity);
        return this.findById(saved.id) as Promise<TeamDomain>;
    }

    async delete(id: string): Promise<void> {
        await this.ormRepo.softDelete(id);
    }
}
