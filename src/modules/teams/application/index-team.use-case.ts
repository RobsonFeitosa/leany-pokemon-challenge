import { Inject, Injectable } from "@nestjs/common";
import type { TeamRepository } from "../domain/repositories/team.repository";
import { Team } from "../domain/entities/team.entity";

@Injectable()
export class IndexTeamUseCase {
    constructor(
        @Inject('TeamRepository')
        private readonly teamRepository: TeamRepository,
    ) { }

    async execute(trainer_id: string): Promise<Team[]> {
        return this.teamRepository.findAllByTrainerId(trainer_id);
    }
}
