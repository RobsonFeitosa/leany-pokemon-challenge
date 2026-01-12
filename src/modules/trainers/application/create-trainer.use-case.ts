import { Inject, Injectable, ConflictException } from "@nestjs/common";
import { Trainer } from "../domain/entities/trainer.entity";
import type { TrainerRepository } from "../domain/repositories/trainer.repository";
import { CreateTrainerDto } from "../infra/http/dtos/create-trainer.dto";

import { GetCepAddressUseCase } from "./get-cep-address.use-case";

@Injectable()
export class CreateTrainerUseCase {
    constructor(
        @Inject('TrainerRepository')
        private readonly trainerRepository: TrainerRepository,
        private readonly getCepAddressUseCase: GetCepAddressUseCase,
    ) { }

    async execute(data: CreateTrainerDto): Promise<Trainer> {
        const trainerExists = await this.trainerRepository.findByEmail(data.email);

        if (trainerExists) {
            throw new ConflictException('Trainer already exists');
        }

        const addressData = await this.getCepAddressUseCase.execute(data.cep);

        const trainer = new Trainer({
            name: data.name,
            email: data.email,
            cep: data.cep,
            street: data.street || addressData.street,
            neighborhood: data.neighborhood || addressData.neighborhood,
            city: data.city || addressData.city,
            state: data.state || addressData.state,
        });

        return this.trainerRepository.create(trainer);
    }
}
