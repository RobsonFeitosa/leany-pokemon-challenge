import { IndexTeamUseCase } from './index-team.use-case';
import type { TeamRepository } from '../domain/repositories/team.repository';

describe('IndexTeamUseCase', () => {
    let useCase: IndexTeamUseCase;
    let teamRepository: jest.Mocked<TeamRepository>;

    beforeEach(() => {
        teamRepository = {
            findAllByTrainerId: jest.fn(),
        } as any;

        useCase = new IndexTeamUseCase(teamRepository);
    });

    it('should be able to list teams by trainer', async () => {
        const teams = [{}, {}];
        teamRepository.findAllByTrainerId.mockResolvedValue(teams as any);

        const result = await useCase.execute('trainer-id');

        expect(result).toEqual(teams);
        expect(teamRepository.findAllByTrainerId).toHaveBeenCalledWith('trainer-id');
    });
});
