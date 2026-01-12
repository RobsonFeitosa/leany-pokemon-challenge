import { FetchPokeApiProvider } from './fetch-poke-api.provider';

describe('FetchPokeApiProvider', () => {
    let provider: FetchPokeApiProvider;

    beforeEach(() => {
        provider = new FetchPokeApiProvider();
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should fetch pokemon data from PokeAPI', async () => {
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({
                id: 25,
                name: 'pikachu',
                sprites: {
                    front_default: 'url',
                    other: {
                        'official-artwork': {
                            front_default: 'official-url'
                        }
                    }
                },
                types: [{ type: { name: 'electric' } }]
            }),
        };
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

        const result = await provider.getPokemon('pikachu');

        expect(result.id).toBe(25);
        expect(result.name).toBe('pikachu');
        expect(result.image_url).toBe('official-url');
        expect(result.types).toBe('electric');
    });

    it('should throw error if pokemon not found', async () => {
        const mockResponse = { ok: false };
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

        await expect(provider.getPokemon('unknown')).rejects.toThrow('Pokemon not found');
    });
});
