import { Controller } from './Controller';
import { Router } from 'express';
import { IExtensions } from '../db/repos';
import * as pgPromise from 'pg-promise';
import { Utils } from './utils';
import { Word } from '../models/Word';
import db = require('../db');

class SubjectController implements Controller {
    path: string;
    router: Router;

    constructor() {
        this.path = '/subjects/';
        this.router = Router();
        this.initializeRoutes(this.path);
    }

    public initializeRoutes(path: string) {
        Utils.GET(path + 'create', this.router, () => db.subjects.create());

        // drop the table:
        Utils.GET(path + 'drop', this.router, () => db.subjects.drop());

        // remove all subjects:
        Utils.GET(path + 'empty', this.router, () => db.subjects.empty());

        // add a new user product, if it doesn't exist yet, and return the object:
        /*Utils.POST(path + 'add', this.router, req => {
            return db.task('add-subject', t => {
                return t.subjects.add(req.body.deck_ID)
                    .then(ass => {
                            console.log(ass);
                            req.body.words.forEach((w: Word) => {
                                let word = new Word(ass.id, w.subject_id, w.value);
                                console.log(word);
                                db.words.add(word);
                            });
                        }
                    );
            });
        });*/

        Utils.GET(path + 'find/:id', this.router, req => {
            return db.subjects.findById(req.params.id);
        });

        // find a product by user id + product name id:
        //Utils.GET(path + 'find/:userId/:name', this.router, req => db.subjects.find(req.params));

        //Find subjects by subjectID
        //Utils.GET(path + 'find/:userId/:name', this.router, req => db.subjects.find(req.params));

        // remove a product by id:
        Utils.GET(path + 'remove/:id', this.router, (req: any) => db.subjects.remove(req.params.id));

        // get all subjects:
        Utils.GET(path + 'all', this.router, () => db.subjects.all());

        // count all subjects:
        Utils.GET(path + 'total', this.router, () => db.subjects.total());

    }

    setDB(db: pgPromise.IDatabase<IExtensions>): void {

    }
}

export default SubjectController;