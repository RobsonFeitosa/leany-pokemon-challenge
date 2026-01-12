import { Pokemon } from "../entities/pokemon.entity";

export interface PokemonRepository {
    create(pokemon: Pokemon): Promise<Pokemon>;
    findById(id: string): Promise<Pokemon | null>;
    findByPokeApiId(pokeApiId: number): Promise<Pokemon | null>;
    findByName(name: string): Promise<Pokemon | null>;
    findAll(): Promise<Pokemon[]>;
    save(pokemon: Pokemon): Promise<Pokemon>;
}
