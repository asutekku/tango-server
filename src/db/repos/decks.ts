import { ColumnSet, IDatabase, IMain } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import sqlProvider = require('../sql');

const sql = sqlProvider.decks;

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

export class DecksRepository {

    // ColumnSet objects static namespace:
    private static cs: DeckColumnsets;

    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    private db: IDatabase<any>;

    private pgp: IMain;

    constructor(db: any, pgp: IMain) {
        this.db = db;
        this.pgp = pgp; // library's root, if ever needed;

        // set-up all ColumnSet objects, if needed:
        this.createColumnsets();
    }

    // Creates the table;
    create() {
        return this.db.none(sql.create);
    }

    // Drops the table;
    drop() {
        return this.db.none(sql.drop);
    }

    // Removes all records from the table;
    empty() {
        return this.db.none(sql.empty);
    }

    // Adds a new user, and returns the new object;
    add(values: any) {
        return this.db.one(sql.add, {
            name: values.name,
            description: values.description,
            collection_ID: values.collection_ID,
            user_ID: values.user_ID
        });
    }

    // Tries to delete a user by id, and returns the number of records deleted;
    remove(id: number) {
        return this.db.result('DELETE FROM decks WHERE id = $1', +id, (r: IResult) => r.rowCount);
    }

    // Tries to find a user from id;
    findById(id: number) {
        return this.db.oneOrNone('SELECT * FROM decks WHERE id = $1', +id);
    }

    findByCollectionId(id: number) {
        return this.db.any('SELECT * FROM decks WHERE collection_id = $1', +id);
    }

    findByCollectionAndUserID(params: any) {
        console.log(params);
        return this.db.any('SELECT * FROM decks WHERE owner_id = $1 AND id = $2', [params.userId, params.collectionId]);
    }

    getWordsFromDeckById(id: number) {
        return this.db.any(sql.getContentById, {
            deck_id: id
        });
    }

    // Tries to find a user from name;
    findByName(name: string) {
        return this.db.oneOrNone('SELECT * FROM decks WHERE name = $1', name);
    }

    // Tries to find by deck name and Collection ID
    findByNameAndCollection(values: any) {
        console.log(values);
        return this.db.oneOrNone(sql.findByNameAndCollection, {
            name: values.name,
            collection_ID: parseInt(values.collection_ID)
        });
    }

    // Returns all user records;
    all() {
        return this.db.any('SELECT * FROM decks');
    }

    // Returns the total number of decks;
    total() {
        return this.db.one('SELECT count(*) FROM decks', [], (a: { count: number }) => +a.count);
    }

    // example of setting up ColumnSet objects:
    private createColumnsets() {
        // create all ColumnSet objects only once:
        if (!DecksRepository.cs) {
            const helpers = this.pgp.helpers, cs: DeckColumnsets = {};

            // Type TableName is useful when schema isn't default "public" ,
            // otherwise you can just pass in a string for the table name.
            const table = new helpers.TableName({table: 'user', schema: 'public'});

            cs.insert = new helpers.ColumnSet(['name'], {table});
            cs.update = cs.insert.extend(['?id']);

            DecksRepository.cs = cs;
        }
    }

}

type DeckColumnsets = {
    insert?: ColumnSet,
    update?: ColumnSet
};
