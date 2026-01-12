import { IndexTrainerUseCase } from './index-trainer.use-case';
import type { TrainerRepository } from '../domain/repositories/trainer.repository';

describe('IndexTrainerUseCase', () => {
    let useCase: IndexTrainerUseCase;
    let trainerRepository: jest.Mocked<TrainerRepository>;

    beforeEach(() => {
        trainerRepository = {
            findAll: jest.fn(),
        } as any;

        useCase = new IndexTrainerUseCase(trainerRepository);
    });

    it('should be able to list all trainers', async () => {
        const trainers = [{}, {}];
        trainerRepository.findAll.mockResolvedValue(trainers as any);

        const result = await useCase.execute();

        expect(result).toEqual(trainers);
        expect(trainerRepository.findAll).toHaveBeenCalled();
    });
});
