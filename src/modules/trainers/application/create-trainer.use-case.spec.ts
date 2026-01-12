import { CreateTrainerUseCase } from './create-trainer.use-case';
import type { TrainerRepository } from '../domain/repositories/trainer.repository';
import { GetCepAddressUseCase } from './get-cep-address.use-case';
import { ConflictException } from '@nestjs/common';
import { Trainer } from '../domain/entities/trainer.entity';

describe('CreateTrainerUseCase', () => {
    let useCase: CreateTrainerUseCase;
    let trainerRepository: jest.Mocked<TrainerRepository>;
    let getCepAddressUseCase: jest.Mocked<GetCepAddressUseCase>;

    beforeEach(() => {
        trainerRepository = {
            create: jest.fn(),
            findByEmail: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
        };
        getCepAddressUseCase = {
            execute: jest.fn(),
        } as any;

        useCase = new CreateTrainerUseCase(trainerRepository, getCepAddressUseCase);
    });

    it('should be able to create a trainer', async () => {
        const createTrainerDto = {
            name: 'Ash Ketchum',
            email: 'ash@pokemon.com',
            cep: '12345-678',
        };

        const addressData = {
            cep: '12345-678',
            street: 'Pallet Town St',
            neighborhood: 'Central',
            city: 'Pallet Town',
            state: 'Kanto',
        };

        trainerRepository.findByEmail.mockResolvedValue(null);
        getCepAddressUseCase.execute.mockResolvedValue(addressData);
        trainerRepository.create.mockImplementation(async (trainer) => trainer);

        const result = await useCase.execute(createTrainerDto);

        expect(result).toBeInstanceOf(Trainer);
        expect(result.getName()).toBe(createTrainerDto.name);
        expect(result.getEmail()).toBe(createTrainerDto.email);
        expect(result.getStreet()).toBe(addressData.street);
        expect(trainerRepository.create).toHaveBeenCalled();
    });

    it('should not be able to create a trainer with an already exists email', async () => {
        const createTrainerDto = {
            name: 'Ash Ketchum',
            email: 'ash@pokemon.com',
            cep: '12345-678',
        };

        trainerRepository.findByEmail.mockResolvedValue({} as any);

        await expect(useCase.execute(createTrainerDto)).rejects.toBeInstanceOf(ConflictException);
    });
});
