import { ColumnSet, IDatabase, IMain } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import { Word } from '../../models/Word';
import sqlProvider = require('../sql');

const sql = sqlProvider.words;

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

export class WordsRepository {

    // ColumnSet objects static namespace:
    private static cs: WordColumnsets;

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
    add(word: Word) {
        return this.db.one(sql.add, <Word>{
            subject_id: word.subject_id,
            assignment_id: word.assignment_id,
            value: word.value
        });
    }

    // Tries to delete a user by id, and returns the number of records deleted;
    remove(id: number) {
        return this.db.result('DELETE FROM words WHERE id = $1', +id, (r: IResult) => r.rowCount);
    }

    // Tries to find a user from id;
    findById(id: number) {
        return this.db.oneOrNone('SELECT * FROM words WHERE id = $1', +id);
    }

    // Tries to find a user from name;
    findByName(name: string) {
        return this.db.oneOrNone('SELECT * FROM words WHERE name = $1', name);
    }

    // Returns all user records;
    all() {
        return this.db.any('SELECT * FROM words');
    }

    // Returns the total number of words;
    total() {
        return this.db.one('SELECT count(*) FROM words', [], (a: { count: number }) => +a.count);
    }

    // example of setting up ColumnSet objects:
    private createColumnsets() {
        // create all ColumnSet objects only once:
        if (!WordsRepository.cs) {
            const helpers = this.pgp.helpers, cs: WordColumnsets = {};

            // Type TableName is useful when schema isn't default "public" ,
            // otherwise you can just pass in a string for the table name.
            const table = new helpers.TableName({table: 'user', schema: 'public'});

            cs.insert = new helpers.ColumnSet(['name'], {table});
            cs.update = cs.insert.extend(['?id']);

            WordsRepository.cs = cs;
        }
    }

}

type WordColumnsets = {
    insert?: ColumnSet,
    update?: ColumnSet
};
