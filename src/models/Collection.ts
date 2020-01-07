export class Collection {
    id: number;
    name: string;
    owner_id: number;
    description: string;
    created_on: string;

    constructor(id: number, name: string, owner_id: number, description: string, created_on: string) {
        this.id = id;
        this.name = name;
        this.owner_id = owner_id;
        this.description = description;
        this.created_on = created_on;
    }
}