import { PokeApiPokemon, PokeApiProvider } from "src/modules/pokemons/domain/providers/poke-api.provider";

export class FetchPokeApiProvider implements PokeApiProvider {
    private readonly baseUrl = 'https://pokeapi.co/api/v2';

    async getPokemon(idOrName: string | number): Promise<PokeApiPokemon> {
        const response = await fetch(`${this.baseUrl}/pokemon/${idOrName}`);

        if (!response.ok) {
            throw new Error(`Pokemon not found: ${idOrName}`);
        }

        const data = await response.json();

        return {
            id: data.id,
            name: data.name,
            image_url: data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default,
            types: data.types.map((t: any) => t.type.name).join(','),
        };
    }
}
