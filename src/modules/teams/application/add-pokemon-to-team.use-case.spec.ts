import { AddPokemonToTeamUseCase } from './add-pokemon-to-team.use-case';
import type { TeamRepository } from '../domain/repositories/team.repository';
import { SyncPokemonUseCase } from '../../pokemons/application/sync-pokemon.use-case';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AddPokemonToTeamUseCase', () => {
    let useCase: AddPokemonToTeamUseCase;
    let teamRepository: jest.Mocked<TeamRepository>;
    let syncPokemonUseCase: jest.Mocked<SyncPokemonUseCase>;

    beforeEach(() => {
        teamRepository = {
            findById: jest.fn(),
            savePokemonAssociation: jest.fn(),
        } as any;
        syncPokemonUseCase = {
            execute: jest.fn(),
        } as any;

        useCase = new AddPokemonToTeamUseCase(teamRepository, syncPokemonUseCase);
    });

    it('should be able to add a pokemon to a team', async () => {
        const team = {
            getPokemons: jest.fn().mockReturnValue([{ id: 'p1-id' }]),
        };
        const syncedPokemon = { getId: () => 'p2-id' };

        teamRepository.findById.mockResolvedValue(team as any);
        syncPokemonUseCase.execute.mockResolvedValue(syncedPokemon as any);

        await useCase.execute('team-id', 'pikachu');

        expect(teamRepository.savePokemonAssociation).toHaveBeenCalledWith('team-id', 'p2-id');
    });

    it('should throw NotFoundException if team does not exist', async () => {
        teamRepository.findById.mockResolvedValue(null);

        await expect(useCase.execute('invalid-id', 'pikachu')).rejects.toBeInstanceOf(NotFoundException);
    });

    it('should throw BadRequestException if team is full', async () => {
        const team = {
            getPokemons: jest.fn().mockReturnValue([{}, {}, {}, {}, {}]),
        };

        teamRepository.findById.mockResolvedValue(team as any);

        await expect(useCase.execute('team-id', 'pikachu')).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should throw BadRequestException if pokemon already in team', async () => {
        const team = {
            getPokemons: jest.fn().mockReturnValue([{ id: 'p1-id' }]),
        };
        const syncedPokemon = { getId: () => 'p1-id' };

        teamRepository.findById.mockResolvedValue(team as any);
        syncPokemonUseCase.execute.mockResolvedValue(syncedPokemon as any);

        await expect(useCase.execute('team-id', 'pikachu')).rejects.toBeInstanceOf(BadRequestException);
    });
});
