import { Inject, Injectable, ConflictException } from "@nestjs/common";
import { Pokemon } from "../domain/entities/pokemon.entity";
import type { PokemonRepository } from "../domain/repositories/pokemon.repository";
import { CreatePokemonDto } from "../infra/http/dtos/create-pokemon.dto";

@Injectable()
export class CreatePokemonUseCase {
    constructor(
        @Inject('PokemonRepository')
        private readonly pokemonRepository: PokemonRepository,
    ) { }

    async execute(data: CreatePokemonDto): Promise<Pokemon> {
        const pokemonExists = await this.pokemonRepository.findByPokeApiId(data.poke_api_id);

        if (pokemonExists) {
            return pokemonExists;
        }

        const pokemon = new Pokemon({
            poke_api_id: data.poke_api_id,
            name: data.name,
            image_url: data.image_url ?? '',
            types: data.types,
        });

        return this.pokemonRepository.create(pokemon);
    }
}
