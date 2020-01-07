export interface IDeck {
    name: string;
    owner_id: number;
    description: string;
    created_on: string;
    collection_id: number;
}

export class Deck implements IDeck {
    collection_id: number;
    created_on: string;
    description: string;
    name: string;
    owner_id: number;
    words: any[];

    constructor({collection_id, created_on, description, name, owner_id, words}: { collection_id: number, created_on: string, description: string, name: string, owner_id: number, words: any[] }) {
        this.collection_id = collection_id;
        this.created_on = created_on;
        this.description = description;
        this.name = name;
        this.owner_id = owner_id;
        this.words = words;
    }

}