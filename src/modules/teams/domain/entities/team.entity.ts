export class Team {
    private id: string;
    private name: string;
    private trainer_id: string;
    private pokemons: any[];

    constructor(props: {
        id?: string;
        name: string;
        trainer_id: string;
        pokemons?: any[];
    }) {
        Object.assign(this, props);
    }

    public getId() { return this.id; }
    public getName() { return this.name; }
    public getTrainerId() { return this.trainer_id; }
    public getPokemons() { return this.pokemons; }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            trainer_id: this.trainer_id,
            pokemons: this.pokemons,
        };
    }
}
