import { Inject, Injectable } from "@nestjs/common";
import type { PokemonRepository } from "../domain/repositories/pokemon.repository";
import { SyncPokemonUseCase } from "./sync-pokemon.use-case";

@Injectable()
export class SyncAllPokemonsUseCase {
    constructor(
        @Inject('PokemonRepository')
        private readonly pokemonRepository: PokemonRepository,
        private readonly syncPokemonUseCase: SyncPokemonUseCase,
    ) { }

    async execute(): Promise<void> {
        const pokemons = await this.pokemonRepository.findAll();

        for (const pokemon of pokemons) {
            await this.syncPokemonUseCase.execute(pokemon.getPokeApiId());
        }
    }
}
