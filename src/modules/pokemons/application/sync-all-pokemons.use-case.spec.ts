import { SyncAllPokemonsUseCase } from './sync-all-pokemons.use-case';
import type { PokemonRepository } from '../domain/repositories/pokemon.repository';
import { SyncPokemonUseCase } from './sync-pokemon.use-case';
import { Pokemon } from '../domain/entities/pokemon.entity';

describe('SyncAllPokemonsUseCase', () => {
    let useCase: SyncAllPokemonsUseCase;
    let pokemonRepository: jest.Mocked<PokemonRepository>;
    let syncPokemonUseCase: jest.Mocked<SyncPokemonUseCase>;

    beforeEach(() => {
        pokemonRepository = {
            findAll: jest.fn(),
        } as any;
        syncPokemonUseCase = {
            execute: jest.fn(),
        } as any;

        useCase = new SyncAllPokemonsUseCase(pokemonRepository, syncPokemonUseCase);
    });

    it('should sync all pokemons in the repository', async () => {
        const pokemons = [
            new Pokemon({ poke_api_id: 1, name: 'p1', types: 't1' }),
            new Pokemon({ poke_api_id: 2, name: 'p2', types: 't2' }),
        ];
        pokemonRepository.findAll.mockResolvedValue(pokemons);

        await useCase.execute();

        expect(pokemonRepository.findAll).toHaveBeenCalled();
        expect(syncPokemonUseCase.execute).toHaveBeenCalledTimes(2);
        expect(syncPokemonUseCase.execute).toHaveBeenCalledWith(1, true);
        expect(syncPokemonUseCase.execute).toHaveBeenCalledWith(2, true);
    });
});
