import { TypeOrmPokemonRepository } from './typeorm-pokemon.repository';
import { Repository } from 'typeorm';
import { PokemonEntity } from '../entities/pokemon.entity';
import { Pokemon as PokemonDomain } from 'src/modules/pokemons/domain/entities/pokemon.entity';

describe('TypeOrmPokemonRepository', () => {
    let repository: TypeOrmPokemonRepository;
    let ormRepo: jest.Mocked<Repository<PokemonEntity>>;

    beforeEach(() => {
        ormRepo = {
            save: jest.fn(),
            findOneBy: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
        } as any;
        repository = new TypeOrmPokemonRepository(ormRepo);
    });

    it('should be able to create a pokemon', async () => {
        const pokemon = new PokemonDomain({
            poke_api_id: 1,
            name: 'Pikachu',
            image_url: 'url',
            types: 'electric',
        });
        const entity = { ...pokemon.toJSON(), id: 'uuid', name: 'pikachu' };
        ormRepo.save.mockResolvedValue(entity as any);

        const result = await repository.create(pokemon);

        expect(result).toBeInstanceOf(PokemonDomain);
        expect(result.getId()).toBe('uuid');
        expect(ormRepo.save).toHaveBeenCalled();
    });

    it('should find pokemon by name', async () => {
        const entity = { id: 'uuid', name: 'pikachu' };
        ormRepo.findOne.mockResolvedValue(entity as any);

        const result = await repository.findByName('Pikachu');

        expect(result?.getName()).toBe('pikachu');
        expect(ormRepo.findOne).toHaveBeenCalledWith({ where: { name: 'pikachu' } });
    });
});
