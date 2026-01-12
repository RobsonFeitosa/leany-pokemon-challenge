import { Inject, Injectable } from "@nestjs/common";
import type { PokemonRepository } from "../domain/repositories/pokemon.repository";
import { Pokemon } from "../domain/entities/pokemon.entity";

@Injectable()
export class IndexPokemonUseCase {
    constructor(
        @Inject('PokemonRepository')
        private readonly pokemonRepository: PokemonRepository,
    ) { }

    async execute(): Promise<Pokemon[]> {
        return this.pokemonRepository.findAll();
    }
}
