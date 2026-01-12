import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { Team } from "../domain/entities/team.entity";
import type { TeamRepository } from "../domain/repositories/team.repository";
import { CreateTeamDto } from "../infra/http/dtos/create-team.dto";
import { SyncPokemonUseCase } from "../../pokemons/application/sync-pokemon.use-case";

@Injectable()
export class CreateTeamUseCase {
    constructor(
        @Inject('TeamRepository')
        private readonly teamRepository: TeamRepository,
        private readonly syncPokemonUseCase: SyncPokemonUseCase,
    ) { }

    async execute(data: CreateTeamDto): Promise<Team> {
        if (data.pokemons.length > 5) {
            throw new BadRequestException('A team can have at most 5 pokemons');
        }

        const uniquePokemons = [...new Set(data.pokemons.map(p => p.toString().toLowerCase()))];
        if (uniquePokemons.length !== data.pokemons.length) {
            throw new BadRequestException('A team cannot have duplicate pokemons');
        }

        const syncedPokemons: string[] = [];
        for (const pokemonIdOrName of data.pokemons) {
            const synced = await this.syncPokemonUseCase.execute(pokemonIdOrName);
            syncedPokemons.push(synced.getId());
        }

        const team = new Team({
            name: data.name,
            trainer_id: data.trainer_id,
            pokemons: syncedPokemons,
        });

        return this.teamRepository.create(team);
    }
}
