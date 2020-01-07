// Bluebird is the best promise library available today, and is the one recommended here:
import * as promise from 'bluebird';
// Loading and initializing pg-promise:
import pgPromise, { IDatabase, IMain, IOptions } from 'pg-promise';

import {
    AssignmentsRepository,
    CollectionsRepository,
    DecksRepository,
    IExtensions,
    SubjectsRepository,
    UsersRepository, WordsRepository
} from './repos';

// pg-promise initialization options:
const initOptions: IOptions<IExtensions> = {

    // Using a custom promise library, instead of the default ES6 Promise.
    // To make the custom promise protocol visible, you need to patch the
    // following file: node_modules/pg-promise/typescript/ext-promise.d.ts
    promiseLib: promise,

    // Extending the database protocol with our custom repositories;
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    extend(obj: IExtensions, dc: any) {
        // Database Context (dc) is mainly needed for extending multiple databases
        // with different access API.

        // Do not use 'require()' here, because this event occurs for every task
        // and transaction being executed, which should be as fast as possible.
        obj.users = new UsersRepository(obj, pgp);
        obj.decks = new DecksRepository(obj, pgp);
        obj.collections = new CollectionsRepository(obj, pgp);
        obj.subjects = new SubjectsRepository(obj, pgp);
        obj.assignments = new AssignmentsRepository(obj, pgp);
        obj.words = new WordsRepository(obj, pgp);
    }

};

// Database connection parameters:
const config = {
    host: 'localhost',
    port: 5432,
    database: 'tangodb',
    user: 'akko'
};


// @ts-ignore
const pgp: IMain = pgPromise(initOptions);

// Create the database instance with extensions:
const db = <IDatabase<IExtensions> & IExtensions>pgp(config);

// Load and initialize optional diagnostics:
import diagnostics = require('./diagnostics');

diagnostics.init(initOptions);

// If you ever need access to the library's root (pgp object), you can do it via db.$config.pgp
// See: http://vitaly-t.github.io/pg-promise/Database.html#.$config
export = db;
