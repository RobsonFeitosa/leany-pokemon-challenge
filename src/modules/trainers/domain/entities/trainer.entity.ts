export class Trainer {
    private id: string;
    private name: string;
    private email: string;
    private cep: string;
    private street: string;
    private neighborhood: string;
    private city: string;
    private state: string;

    constructor(props: {
        id?: string;
        name: string;
        email: string;
        cep: string;
        street: string;
        neighborhood: string;
        city: string;
        state: string;
    }) {
        Object.assign(this, props);
    }

    public getId() { return this.id; }
    public getName() { return this.name; }
    public getEmail() { return this.email; }
    public getCep() { return this.cep; }
    public getStreet() { return this.street; }
    public getNeighborhood() { return this.neighborhood; }
    public getCity() { return this.city; }
    public getState() { return this.state; }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            cep: this.cep,
            street: this.street,
            neighborhood: this.neighborhood,
            city: this.city,
            state: this.state,
        };
    }
}
