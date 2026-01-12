import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('pokemons')
export class PokemonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'poke_api_id', unique: true })
    poke_api_id: number;

    @Column()
    name: string;

    @Column({ name: 'image_url', nullable: true })
    imageUrl: string;

    @Column()
    types: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
