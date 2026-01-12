import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { TrainerEntity } from "src/modules/trainers/infra/database/entities/trainer.entity";
import { TeamPokemonEntity } from "src/modules/teams/infra/database/entities/team-pokemon.entity";

@Entity('teams')
export class TeamEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ name: 'trainer_id' })
    trainer_id: string;

    @ManyToOne(() => TrainerEntity)
    @JoinColumn({ name: 'trainer_id' })
    trainer: TrainerEntity;

    @OneToMany(() => TeamPokemonEntity, (teamPokemon) => teamPokemon.team)
    teamPokemons: TeamPokemonEntity[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
