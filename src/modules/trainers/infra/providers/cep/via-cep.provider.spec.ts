import { ViaCepProvider } from './via-cep.provider';
import { BadRequestException } from '@nestjs/common';

describe('ViaCepProvider', () => {
    let provider: ViaCepProvider;

    beforeEach(() => {
        provider = new ViaCepProvider();
        // Mock global fetch
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should be able to get address by cep', async () => {
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({
                cep: '01001-000',
                logradouro: 'Praça da Sé',
                bairro: 'Sé',
                localidade: 'São Paulo',
                uf: 'SP',
            }),
        };
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

        const result = await provider.getAddress('01001-000');

        expect(result.street).toBe('Praça da Sé');
        expect(global.fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/01001000/json/');
    });

    it('should throw BadRequestException if CEP is invalid format', async () => {
        await expect(provider.getAddress('123')).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if CEP is not found', async () => {
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({ erro: true }),
        };
        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

        await expect(provider.getAddress('00000-000')).rejects.toThrow(BadRequestException);
    });
});
