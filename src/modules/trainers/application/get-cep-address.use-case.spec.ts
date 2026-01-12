import { GetCepAddressUseCase } from './get-cep-address.use-case';
import type { CepProvider } from '../domain/providers/cep.provider';

describe('GetCepAddressUseCase', () => {
    let useCase: GetCepAddressUseCase;
    let cepProvider: jest.Mocked<CepProvider>;

    beforeEach(() => {
        cepProvider = {
            getAddress: jest.fn(),
        };
        useCase = new GetCepAddressUseCase(cepProvider);
    });

    it('should be able to get address by cep', async () => {
        const addressData = {
            cep: '12345-678',
            street: 'Rua Teste',
            neighborhood: 'Bairro Teste',
            city: 'Cidade Teste',
            state: 'Estado Teste',
        };

        cepProvider.getAddress.mockResolvedValue(addressData);

        const result = await useCase.execute('12345678');

        expect(result).toEqual(addressData);
        expect(cepProvider.getAddress).toHaveBeenCalledWith('12345678');
    });
});
