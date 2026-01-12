import { CreateTeamUseCase } from './create-team.use-case';
import type { TeamRepository } from '../domain/repositories/team.repository';
import { SyncPokemonUseCase } from '../../pokemons/application/sync-pokemon.use-case';
import { BadRequestException } from '@nestjs/common';
import { Team } from '../domain/entities/team.entity';

describe('CreateTeamUseCase', () => {
    let useCase: CreateTeamUseCase;
    let teamRepository: jest.Mocked<TeamRepository>;
    let syncPokemonUseCase: jest.Mocked<SyncPokemonUseCase>;

    beforeEach(() => {
        teamRepository = {
            create: jest.fn(),
        } as any;
        syncPokemonUseCase = {
            execute: jest.fn(),
        } as any;

        useCase = new CreateTeamUseCase(teamRepository, syncPokemonUseCase);
    });

    it('should be able to create a new team', async () => {
        const dto = {
            name: 'Kanto Legends',
            trainer_id: 'trainer-id',
            pokemons: ['pikachu', 'charizard'],
        };

        syncPokemonUseCase.execute.mockResolvedValueOnce({ getId: () => 'p1-id' } as any);
        syncPokemonUseCase.execute.mockResolvedValueOnce({ getId: () => 'p2-id' } as any);
        teamRepository.create.mockImplementation(async (t) => t);

        const result = await useCase.execute(dto);

        expect(result).toBeInstanceOf(Team);
        expect(result.getName()).toBe('Kanto Legends');
        expect(syncPokemonUseCase.execute).toHaveBeenCalledTimes(2);
        expect(teamRepository.create).toHaveBeenCalled();
    });

    it('should not be able to create a team with more than 5 pokemons', async () => {
        const dto = {
            name: 'Too many',
            trainer_id: 'id',
            pokemons: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'],
        };

        await expect(useCase.execute(dto)).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should not be able to create a team with duplicate pokemons', async () => {
        const dto = {
            name: 'Duplicates',
            trainer_id: 'id',
            pokemons: ['pikachu', 'pikachu'],
        };

        await expect(useCase.execute(dto)).rejects.toBeInstanceOf(BadRequestException);
    });
});
