import { TypeOrmTeamRepository } from './typeorm-team.repository';
import { Repository } from 'typeorm';
import { TeamEntity } from '../entities/team.entity';
import { TeamPokemonEntity } from '../entities/team-pokemon.entity';
import { Team as TeamDomain } from 'src/modules/teams/domain/entities/team.entity';

describe('TypeOrmTeamRepository', () => {
    let repository: TypeOrmTeamRepository;
    let ormRepo: jest.Mocked<Repository<TeamEntity>>;
    let teamPokemonRepo: jest.Mocked<Repository<TeamPokemonEntity>>;

    beforeEach(() => {
        ormRepo = {
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            softDelete: jest.fn(),
        } as any;
        teamPokemonRepo = {
            save: jest.fn(),
        } as any;
        repository = new TypeOrmTeamRepository(ormRepo, teamPokemonRepo);
    });

    it('should be able to create a team with pokemons', async () => {
        const team = new TeamDomain({
            name: 'Kanto',
            trainer_id: 'trainer-id',
            pokemons: ['p1-id', 'p2-id'],
        });
        const teamEntity = { id: 'team-uuid', name: 'Kanto', trainer_id: 'trainer-id' };

        ormRepo.save.mockResolvedValue(teamEntity as any);
        // Mock findById which is called at the end of create
        jest.spyOn(repository, 'findById').mockResolvedValue(team);

        const result = await repository.create(team);

        expect(ormRepo.save).toHaveBeenCalled();
        expect(teamPokemonRepo.save).toHaveBeenCalled();
        expect(result).toBeInstanceOf(TeamDomain);
    });

    it('should be able to save a pokemon association', async () => {
        await repository.savePokemonAssociation('team-id', 'pokemon-id');
        expect(teamPokemonRepo.save).toHaveBeenCalled();
    });

    it('should delete (soft delete) a team', async () => {
        await repository.delete('team-uuid');
        expect(ormRepo.softDelete).toHaveBeenCalledWith('team-uuid');
    });
});
