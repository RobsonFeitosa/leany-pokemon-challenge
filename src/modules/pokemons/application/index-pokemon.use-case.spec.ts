import { IndexPokemonUseCase } from './index-pokemon.use-case';
import type { PokemonRepository } from '../domain/repositories/pokemon.repository';

describe('IndexPokemonUseCase', () => {
    let useCase: IndexPokemonUseCase;
    let pokemonRepository: jest.Mocked<PokemonRepository>;

    beforeEach(() => {
        pokemonRepository = {
            findAll: jest.fn(),
        } as any;

        useCase = new IndexPokemonUseCase(pokemonRepository);
    });

    it('should be able to list all pokemons', async () => {
        const pokemons = [{}, {}];
        pokemonRepository.findAll.mockResolvedValue(pokemons as any);

        const result = await useCase.execute();

        expect(result).toEqual(pokemons);
        expect(pokemonRepository.findAll).toHaveBeenCalled();
    });
});
