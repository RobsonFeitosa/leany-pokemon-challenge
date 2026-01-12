export interface CepData {
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
}

export interface CepProvider {
    getAddress(cep: string): Promise<CepData>;
}
