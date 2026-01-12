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

        if (teams.length > 0) {
            throw new BadRequestException('Cannot delete trainer with active teams. Please delete or reassign the teams first.');
        }

        await this.trainerRepository.delete(id);
    }
}
