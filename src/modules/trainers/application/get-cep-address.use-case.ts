import { Inject, Injectable } from "@nestjs/common";
import type { CepData, CepProvider } from "../domain/providers/cep.provider";

@Injectable()
export class GetCepAddressUseCase {
    constructor(
        @Inject('CepProvider')
        private readonly cepProvider: CepProvider,
    ) { }

    async execute(cep: string): Promise<CepData> {
        return this.cepProvider.getAddress(cep);
    }
}
