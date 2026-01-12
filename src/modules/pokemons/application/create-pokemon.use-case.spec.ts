import { CreatePokemonUseCase } from './create-pokemon.use-case';
import type { PokemonRepository } from '../domain/repositories/pokemon.repository';
import { Pokemon } from '../domain/entities/pokemon.entity';

describe('CreatePokemonUseCase', () => {
    let useCase: CreatePokemonUseCase;
    let pokemonRepository: jest.Mocked<PokemonRepository>;

    beforeEach(() => {
        pokemonRepository = {
            create: jest.fn(),
            findByPokeApiId: jest.fn(),
        } as any;

        useCase = new CreatePokemonUseCase(pokemonRepository);
    });

    it('should be able to create a new pokemon', async () => {
        const dto = {
            poke_api_id: 1,
            name: 'pikachu',
            image_url: 'url',
            types: 'electric',
        };

        pokemonRepository.findByPokeApiId.mockResolvedValue(null);
        pokemonRepository.create.mockImplementation(async (p) => p);

        const result = await useCase.execute(dto);

        expect(result).toBeInstanceOf(Pokemon);
        expect(result.getName()).toBe('pikachu');
        expect(pokemonRepository.create).toHaveBeenCalled();
    });
});
