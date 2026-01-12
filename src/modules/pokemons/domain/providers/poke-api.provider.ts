export interface PokeApiPokemon {
    id: number;
    name: string;
    image_url: string;
    types: string;
}

export interface PokeApiProvider {
    getPokemon(idOrName: string | number): Promise<PokeApiPokemon>;
}
