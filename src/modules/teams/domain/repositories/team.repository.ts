import { Team } from "../entities/team.entity";

export interface TeamRepository {
    create(team: Team): Promise<Team>;
    findById(id: string): Promise<Team | null>;
    findAllByTrainerId(trainerId: string): Promise<Team[]>;
    save(team: Team): Promise<Team>;
    savePokemonAssociation(teamId: string, pokemonId: string): Promise<void>;
    delete(id: string): Promise<void>;
}
