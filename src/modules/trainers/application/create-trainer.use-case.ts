import { Inject, Injectable, ConflictException } from "@nestjs/common";
import { Trainer } from "../domain/entities/trainer.entity";
import type { TrainerRepository } from "../domain/repositories/trainer.repository";
import { CreateTrainerDto } from "../infra/http/dtos/create-trainer.dto";

@Injectable()
export class CreateTrainerUseCase {
    constructor(
        @Inject('TrainerRepository')
        private readonly trainerRepository: TrainerRepository,
    ) { }

    async execute(data: CreateTrainerDto): Promise<Trainer> {
        const trainerExists = await this.trainerRepository.findByEmail(data.email);

        if (trainerExists) {
            throw new ConflictException('Trainer already exists');
        }

        const trainer = new Trainer(data);

        return this.trainerRepository.create(trainer);
    }
}
