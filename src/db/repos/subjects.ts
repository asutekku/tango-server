import { ColumnSet, IDatabase, IMain } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import sqlProvider = require('../sql');

const sql = sqlProvider.subjects;

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

export class SubjectsRepository {

    // ColumnSet objects static namespace:
    private static cs: SubjectColumnsets;

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

    // Adds a new subject, and returns the new object;
    add(name: string) {
        return this.db.one(sql.add, name);
    }

    // Tries to delete a subject by id, and returns the number of records deleted;
    remove(id: number) {
        return this.db.result('DELETE FROM subjects WHERE id = $1', +id, (r: IResult) => r.rowCount);
    }

    // Tries to find a subject from id;
    findById(id: number) {
        return this.db.oneOrNone('SELECT * FROM subjects WHERE id = $1', +id);
    }

    // Tries to find a subject from name;
    findByName(name: string) {
        return this.db.oneOrNone('SELECT * FROM subjects WHERE name = $1', name);
    }

    // Returns all subject records;
    all() {
        return this.db.any('SELECT * FROM subjects');
    }

    // Returns the total number of subjects;
    total() {
        return this.db.one('SELECT count(*) FROM subjects', [], (a: { count: number }) => +a.count);
    }

    // example of setting up ColumnSet objects:
    private createColumnsets() {
        // create all ColumnSet objects only once:
        if (!SubjectsRepository.cs) {
            const helpers = this.pgp.helpers, cs: SubjectColumnsets = {};

            // Type TableName is useful when schema isn't default "public" ,
            // otherwise you can just pass in a string for the table name.
            const table = new helpers.TableName({table: 'subject', schema: 'public'});

            cs.insert = new helpers.ColumnSet(['name'], {table});
            cs.update = cs.insert.extend(['?id']);

            SubjectsRepository.cs = cs;
        }
    }

}

type SubjectColumnsets = {
    insert?: ColumnSet,
    update?: ColumnSet
};
