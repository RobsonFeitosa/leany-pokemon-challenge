export class Pokemon {
    private id: string;
    private poke_api_id: number;
    private name: string;
    private image_url: string;
    private types: string;

    constructor(props: {
        id?: string;
        poke_api_id: number;
        name: string;
        image_url: string;
        types: string;
    }) {
        Object.assign(this, props);
    }

    public getId() { return this.id; }
    public getPokeApiId() { return this.poke_api_id; }
    public getName() { return this.name; }
    public getImageUrl() { return this.image_url; }
    public getTypes() { return this.types; }

    public toJSON() {
        return {
            id: this.id,
            poke_api_id: this.poke_api_id,
            name: this.name,
            image_url: this.image_url,
            types: this.types,
        };
    }
}
