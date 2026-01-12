import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { Team } from "../domain/entities/team.entity";
import type { TeamRepository } from "../domain/repositories/team.repository";
import { CreateTeamDto } from "../infra/http/dtos/create-team.dto";

@Injectable()
export class CreateTeamUseCase {
    constructor(
        @Inject('TeamRepository')
        private readonly teamRepository: TeamRepository,
    ) { }

    async execute(data: CreateTeamDto): Promise<Team> {
        if (data.pokemons.length > 6) {
            throw new BadRequestException('A team can have at most 6 pokemons');
        }

        const team = new Team({
            name: data.name,
            trainer_id: data.trainer_id,
            pokemons: data.pokemons,
        });

        return this.teamRepository.create(team);
    }
}
