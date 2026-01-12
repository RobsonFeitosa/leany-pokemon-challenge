import { Trainer } from "../entities/trainer.entity";

export interface TrainerRepository {
    create(trainer: Trainer): Promise<Trainer>;
    findById(id: string): Promise<Trainer | null>;
    findByEmail(email: string): Promise<Trainer | null>;
    findAll(): Promise<Trainer[]>;
    save(trainer: Trainer): Promise<Trainer>;
    delete(id: string): Promise<void>;
}
