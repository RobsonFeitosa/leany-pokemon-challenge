import { Inject, Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import type { TeamRepository } from "../domain/repositories/team.repository";
import { SyncPokemonUseCase } from "../../pokemons/application/sync-pokemon.use-case";

@Injectable()
export class AddPokemonToTeamUseCase {
    constructor(
        @Inject('TeamRepository')
        private readonly teamRepository: TeamRepository,
        private readonly syncPokemonUseCase: SyncPokemonUseCase,
    ) { }

    async execute(teamId: string, pokemonIdOrName: string | number): Promise<any> {
        const team = await this.teamRepository.findById(teamId);

        if (!team) {
            throw new NotFoundException('Team not found');
        }

        const currentPokemons = team.getPokemons();

        if (currentPokemons.length >= 5) {
            throw new BadRequestException('A team can have at most 5 pokemons');
        }

        const syncedPokemon = await this.syncPokemonUseCase.execute(pokemonIdOrName);

        const isAlreadyInTeam = currentPokemons.some(p => p.id === syncedPokemon.getId());
        if (isAlreadyInTeam) {
            throw new BadRequestException('Pokemon already in team');
        }

        await this.teamRepository.savePokemonAssociation(teamId, syncedPokemon.getId());

        return this.teamRepository.findById(teamId);
    }
}
