import { Inject, Injectable } from "@nestjs/common";
import { Pokemon } from "../domain/entities/pokemon.entity";
import type { PokemonRepository } from "../domain/repositories/pokemon.repository";
import type { PokeApiProvider } from "../domain/providers/poke-api.provider";

@Injectable()
export class SyncPokemonUseCase {
    constructor(
        @Inject('PokemonRepository')
        private readonly pokemonRepository: PokemonRepository,
        @Inject('PokeApiProvider')
        private readonly pokeApiProvider: PokeApiProvider,
    ) { }

    async execute(idOrName: string | number, forceSync = false): Promise<Pokemon> {
        if (!forceSync) {
            let localPokemon: Pokemon | null = null;
            if (typeof idOrName === 'number') {
                localPokemon = await this.pokemonRepository.findByPokeApiId(idOrName);
            } else {
                const idAsNumber = parseInt(idOrName);
                if (!isNaN(idAsNumber)) {
                    localPokemon = await this.pokemonRepository.findByPokeApiId(idAsNumber);
                } else {
                    localPokemon = await this.pokemonRepository.findByName(idOrName.toLowerCase());
                }
            }

            if (localPokemon) {
                return localPokemon;
            }
        }

        const pokeData = await this.pokeApiProvider.getPokemon(idOrName);

        let pokemon = await this.pokemonRepository.findByPokeApiId(pokeData.id);

        if (pokemon) {
            pokemon = new Pokemon({
                ...pokemon.toJSON(),
                name: pokeData.name,
                image_url: pokeData.image_url,
                types: pokeData.types,
            });
            return this.pokemonRepository.save(pokemon);
        }

        const newPokemon = new Pokemon({
            poke_api_id: pokeData.id,
            name: pokeData.name,
            image_url: pokeData.image_url,
            types: pokeData.types,
        });

        return this.pokemonRepository.create(newPokemon);
    }
}
