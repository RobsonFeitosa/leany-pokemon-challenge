import { TypeOrmTrainerRepository } from './typeorm-trainer.repository';
import { Repository } from 'typeorm';
import { TrainerEntity } from '../entities/trainer.entity';
import { Trainer as TrainerDomain } from 'src/modules/trainers/domain/entities/trainer.entity';

describe('TypeOrmTrainerRepository', () => {
    let repository: TypeOrmTrainerRepository;
    let ormRepo: jest.Mocked<Repository<TrainerEntity>>;

    beforeEach(() => {
        ormRepo = {
            save: jest.fn(),
            findOneBy: jest.fn(),
            find: jest.fn(),
            softDelete: jest.fn(),
        } as any;
        repository = new TypeOrmTrainerRepository(ormRepo);
    });

    it('should be able to create a trainer', async () => {
        const trainer = new TrainerDomain({
            name: 'Ash',
            email: 'ash@pokemon.com',
            cep: '123',
            street: 'st',
            neighborhood: 'nb',
            city: 'ct',
            state: 'st',
        });
        const entity = { ...trainer.toJSON(), id: 'uuid' };
        ormRepo.save.mockResolvedValue(entity as any);

        const result = await repository.create(trainer);

        expect(result).toBeInstanceOf(TrainerDomain);
        expect(result.getId()).toBe('uuid');
        expect(ormRepo.save).toHaveBeenCalled();
    });

    it('should find trainer by id', async () => {
        const entity = { id: 'uuid', name: 'Ash' };
        ormRepo.findOneBy.mockResolvedValue(entity as any);

        const result = await repository.findById('uuid');

        expect(result?.getName()).toBe('Ash');
    });

    it('should return null if trainer not found by id', async () => {
        ormRepo.findOneBy.mockResolvedValue(null);
        const result = await repository.findById('uuid');
        expect(result).toBeNull();
    });

    it('should delete (soft delete) a trainer', async () => {
        await repository.delete('uuid');
        expect(ormRepo.softDelete).toHaveBeenCalledWith('uuid');
    });
});
