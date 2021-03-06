import { ColumnSet, IDatabase, IMain } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import sqlProvider = require('../sql');

const sql = sqlProvider.collections;

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

export class CollectionsRepository {

    // ColumnSet objects static namespace:
    // ColumnSet objects static namespace:
    private static cs: CollectionColumnsets;

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

    // Adds a new collection, and returns the new object;
    add(values: any) {
        return this.db.one(sql.add, {
            name: values.name,
            description: values.description,
            user_ID: values.user_ID
        });
    }

    // Tries to delete a user by id, and returns the number of records deleted;
    remove(id: number) {
        return this.db.result('DELETE FROM collections WHERE id = $1', +id, (r: IResult) => r.rowCount);
    }

    // Tries to find a user from id;
    findById(id: number) {
        return this.db.oneOrNone('SELECT * FROM collections WHERE id = $1', +id);
    }

    // Tries to find a user from name;
    findByName(name: string) {
        return this.db.oneOrNone('SELECT * FROM collections WHERE name = $1', name);
    }

    // Returns all user records;
    all() {
        return this.db.any('SELECT * FROM collections');
    }

    find(values: any) {
        console.log(values);
        return this.db.oneOrNone(sql.find, {
            user_ID: values.user_ID
        });
    }

    findByCollectionAndUserID(params: any) {
        console.log(params);
        return this.db.any('SELECT * FROM collections WHERE owner_id = $1 AND id = $2', [params.userId, params.collectionId]);
    }

    findByUserId(params: any) {
        console.log(params);
        return this.db.any('SELECT * FROM collections WHERE owner_id = $1', params.userId);
    }

    // Returns the total number of collections;
    total() {
        return this.db.one('SELECT count(*) FROM collections', [], (a: { count: number }) => +a.count);
    }

    // example of setting up ColumnSet objects:
    private createColumnsets() {
        // create all ColumnSet objects only once:
        if (!CollectionsRepository.cs) {
            const helpers = this.pgp.helpers, cs: CollectionColumnsets = {};

            // Type TableName is useful when schema isn't default "public" ,
            // otherwise you can just pass in a string for the table name.
            const table = new helpers.TableName({table: 'user', schema: 'public'});

            cs.insert = new helpers.ColumnSet(['name'], {table});
            cs.update = cs.insert.extend(['?id']);

            CollectionsRepository.cs = cs;
        }
    }

}

type CollectionColumnsets = {
    insert?: ColumnSet,
    update?: ColumnSet
};
