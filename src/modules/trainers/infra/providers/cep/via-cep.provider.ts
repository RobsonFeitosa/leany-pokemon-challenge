import { Injectable, BadRequestException } from "@nestjs/common";
import type { CepData, CepProvider } from "../../../domain/providers/cep.provider";

@Injectable()
export class ViaCepProvider implements CepProvider {
    async getAddress(cep: string): Promise<CepData> {
        const sanitizedCep = cep.replace(/\D/g, '');

        if (sanitizedCep.length !== 8) {
            throw new BadRequestException('Invalid CEP format');
        }

        const response = await fetch(`https://viacep.com.br/ws/${sanitizedCep}/json/`);
        const data = await response.json();

        if (data.erro) {
            throw new BadRequestException('CEP not found');
        }

        return {
            cep: data.cep,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
        };
    }
}
