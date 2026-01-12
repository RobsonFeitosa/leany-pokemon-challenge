import { Inject, Injectable } from "@nestjs/common";
import type { TrainerRepository } from "../domain/repositories/trainer.repository";
import { Trainer } from "../domain/entities/trainer.entity";

@Injectable()
export class IndexTrainerUseCase {
    constructor(
        @Inject('TrainerRepository')
        private readonly trainerRepository: TrainerRepository,
    ) { }

    async execute(): Promise<Trainer[]> {
        return this.trainerRepository.findAll();
    }
}
