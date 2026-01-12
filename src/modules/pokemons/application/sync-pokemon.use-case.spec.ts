import { SyncPokemonUseCase } from './sync-pokemon.use-case';
import type { PokemonRepository } from '../domain/repositories/pokemon.repository';
import type { PokeApiProvider } from '../domain/providers/poke-api.provider';
import { Pokemon } from '../domain/entities/pokemon.entity';

describe('SyncPokemonUseCase', () => {
    let useCase: SyncPokemonUseCase;
    let pokemonRepository: jest.Mocked<PokemonRepository>;
    let pokeApiProvider: jest.Mocked<PokeApiProvider>;

    beforeEach(() => {
        pokemonRepository = {
            findByPokeApiId: jest.fn(),
            findByName: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
        } as any;
        pokeApiProvider = {
            getPokemon: jest.fn(),
        } as any;

        useCase = new SyncPokemonUseCase(pokemonRepository, pokeApiProvider);
    });

    it('should return local pokemon if exists and forceSync is false', async () => {
        const localPokemon = new Pokemon({ poke_api_id: 1, name: 'pikachu', types: 'electric', image_url: 'url' });
        pokemonRepository.findByPokeApiId.mockResolvedValue(localPokemon);

        const result = await useCase.execute(1);

        expect(result).toBe(localPokemon);
        expect(pokeApiProvider.getPokemon).not.toHaveBeenCalled();
    });

    it('should fetch from PokeAPI if local pokemon does not exist', async () => {
        const pokeData = { id: 1, name: 'pikachu', image_url: 'url', types: 'electric' };
        pokemonRepository.findByPokeApiId.mockResolvedValue(null);
        pokeApiProvider.getPokemon.mockResolvedValue(pokeData);
        pokemonRepository.create.mockImplementation(async (p) => p);

        const result = await useCase.execute(1);

        expect(result.getName()).toBe('pikachu');
        expect(pokeApiProvider.getPokemon).toHaveBeenCalledWith(1);
        expect(pokemonRepository.create).toHaveBeenCalled();
    });

    it('should update local pokemon if exists and forceSync is true', async () => {
        const localPokemon = new Pokemon({ id: 'uuid', poke_api_id: 1, name: 'old-name', types: 'old-types', image_url: 'url' });
        const pokeData = { id: 1, name: 'pikachu', image_url: 'url', types: 'electric' };

        // On first check (if forceSync was false), but here we force it
        pokeApiProvider.getPokemon.mockResolvedValue(pokeData);
        pokemonRepository.findByPokeApiId.mockResolvedValue(localPokemon);
        pokemonRepository.save.mockImplementation(async (p) => p);

        const result = await useCase.execute(1, true);

        expect(result.getName()).toBe('pikachu');
        expect(pokemonRepository.save).toHaveBeenCalled();
    });
});
