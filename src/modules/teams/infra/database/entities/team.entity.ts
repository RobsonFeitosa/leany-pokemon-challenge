import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, DeleteDateColumn } from "typeorm";
import { TrainerEntity } from "../../../../trainers/infra/database/entities/trainer.entity";
import type { TeamPokemonEntity } from "./team-pokemon.entity";

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

    @OneToMany('TeamPokemonEntity', (teamPokemon: any) => teamPokemon.team)
    teamPokemons: TeamPokemonEntity[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;
}
