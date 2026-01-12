import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import type { TeamEntity } from "./team.entity";
import { PokemonEntity } from "../../../../pokemons/infra/database/entities/pokemon.entity";

@Entity('team_pokemons')
export class TeamPokemonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'team_id' })
    team_id: string;

    @Column({ name: 'pokemon_id' })
    pokemon_id: string;

    @ManyToOne('TeamEntity', (team: any) => team.teamPokemons)
    @JoinColumn({ name: 'team_id' })
    team: TeamEntity;

    @ManyToOne(() => PokemonEntity)
    @JoinColumn({ name: 'pokemon_id' })
    pokemon: PokemonEntity;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
