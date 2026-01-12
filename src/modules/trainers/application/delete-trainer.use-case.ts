import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { TrainerRepository } from "../domain/repositories/trainer.repository";
import type { TeamRepository } from "../../teams/domain/repositories/team.repository";

@Injectable()
export class DeleteTrainerUseCase {
    constructor(
        @Inject('TrainerRepository')
        private readonly trainerRepository: TrainerRepository,
        @Inject('TeamRepository')
        private readonly teamRepository: TeamRepository,
    ) { }

    async execute(id: string): Promise<void> {
        const trainer = await this.trainerRepository.findById(id);
        if (!trainer) throw new NotFoundException('Trainer not found');

        const teams = await this.teamRepository.findAllByTrainerId(id);

        for (const team of teams) {
            await this.teamRepository.delete(team.getId());
        }

        await this.trainerRepository.delete(id);
    }
}
