import { DeleteTrainerUseCase } from './delete-trainer.use-case';
import type { TrainerRepository } from '../domain/repositories/trainer.repository';
import type { TeamRepository } from '../../teams/domain/repositories/team.repository';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('DeleteTrainerUseCase', () => {
    let useCase: DeleteTrainerUseCase;
    let trainerRepository: jest.Mocked<TrainerRepository>;
    let teamRepository: jest.Mocked<TeamRepository>;

    beforeEach(() => {
        trainerRepository = {
            findById: jest.fn(),
            delete: jest.fn(),
        } as any;
        teamRepository = {
            findAllByTrainerId: jest.fn(),
        } as any;

        useCase = new DeleteTrainerUseCase(trainerRepository, teamRepository);
    });

    it('should be able to delete a trainer', async () => {
        trainerRepository.findById.mockResolvedValue({} as any);
        teamRepository.findAllByTrainerId.mockResolvedValue([]);

        await useCase.execute('trainer-id');

        expect(trainerRepository.delete).toHaveBeenCalledWith('trainer-id');
    });

    it('should throw NotFoundException if trainer does not exist', async () => {
        trainerRepository.findById.mockResolvedValue(null);

        await expect(useCase.execute('trainer-id')).rejects.toBeInstanceOf(NotFoundException);
    });

    it('should throw BadRequestException if trainer has active teams', async () => {
        trainerRepository.findById.mockResolvedValue({} as any);
        teamRepository.findAllByTrainerId.mockResolvedValue([{} as any]);

        await expect(useCase.execute('trainer-id')).rejects.toBeInstanceOf(BadRequestException);
    });
});
