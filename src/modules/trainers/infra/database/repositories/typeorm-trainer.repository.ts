import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainer as TrainerDomain } from "src/modules/trainers/domain/entities/trainer.entity";
import { TrainerRepository } from "src/modules/trainers/domain/repositories/trainer.repository";
import { TrainerEntity } from '../entities/trainer.entity';
import { BaseMapper } from 'src/shared/infra/database/base.mapper';

@Injectable()
export class TypeOrmTrainerRepository implements TrainerRepository {
    constructor(
        @InjectRepository(TrainerEntity)
        private readonly ormRepo: Repository<TrainerEntity>
    ) { }

    async create(trainer: TrainerDomain): Promise<TrainerDomain> {
        const entity = BaseMapper.toPersistence(trainer.toJSON(), TrainerEntity);
        const saved = await this.ormRepo.save(entity);
        return BaseMapper.toDomain(saved, TrainerDomain);
    }

    async findById(id: string): Promise<TrainerDomain | null> {
        const entity = await this.ormRepo.findOneBy({ id });
        if (!entity) return null;
        return BaseMapper.toDomain(entity, TrainerDomain);
    }

    async findByEmail(email: string): Promise<TrainerDomain | null> {
        const entity = await this.ormRepo.findOneBy({ email });
        if (!entity) return null;
        return BaseMapper.toDomain(entity, TrainerDomain);
    }

    async findAll(): Promise<TrainerDomain[]> {
        const entities = await this.ormRepo.find();
        return entities.map(entity => BaseMapper.toDomain(entity, TrainerDomain));
    }

    async save(trainer: TrainerDomain): Promise<TrainerDomain> {
        const entity = BaseMapper.toPersistence(trainer.toJSON(), TrainerEntity);
        const saved = await this.ormRepo.save(entity);
        return BaseMapper.toDomain(saved, TrainerDomain);
    }

    async delete(id: string): Promise<void> {
        await this.ormRepo.softDelete(id);
    }
}
