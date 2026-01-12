import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon as PokemonDomain } from "src/modules/pokemons/domain/entities/pokemon.entity";
import { PokemonRepository } from "src/modules/pokemons/domain/repositories/pokemon.repository";
import { PokemonEntity } from '../entities/pokemon.entity';
import { BaseMapper } from 'src/shared/infra/database/base.mapper';

@Injectable()
export class TypeOrmPokemonRepository implements PokemonRepository {
    constructor(
        @InjectRepository(PokemonEntity)
        private readonly ormRepo: Repository<PokemonEntity>
    ) { }

    async create(pokemon: PokemonDomain): Promise<PokemonDomain> {
        const entity = BaseMapper.toPersistence(pokemon.toJSON(), PokemonEntity);
        const saved = await this.ormRepo.save(entity);
        return BaseMapper.toDomain(saved, PokemonDomain);
    }

    async findById(id: string): Promise<PokemonDomain | null> {
        const entity = await this.ormRepo.findOneBy({ id });
        if (!entity) return null;
        return BaseMapper.toDomain(entity, PokemonDomain);
    }

    async findByPokeApiId(poke_api_id: number): Promise<PokemonDomain | null> {
        const entity = await this.ormRepo.findOneBy({ poke_api_id });
        if (!entity) return null;
        return BaseMapper.toDomain(entity, PokemonDomain);
    }

    async findAll(): Promise<PokemonDomain[]> {
        const entities = await this.ormRepo.find();
        return entities.map(entity => BaseMapper.toDomain(entity, PokemonDomain));
    }

    async save(pokemon: PokemonDomain): Promise<PokemonDomain> {
        const entity = BaseMapper.toPersistence(pokemon.toJSON(), PokemonEntity);
        const saved = await this.ormRepo.save(entity);
        return BaseMapper.toDomain(saved, PokemonDomain);
    }
}
