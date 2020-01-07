import { Controller } from './Controller';
import { Router } from "express";
import { IExtensions } from '../db/repos';
import { Utils } from './utils';
import { Word } from '../models/Word';
import db = require('../db');
import * as pgPromise from 'pg-promise';

class AssignmentController implements Controller {
    path: string;
    router: Router;

    constructor() {
        this.path = '/assignments/';
        this.router = Router();
        this.initializeRoutes(this.path);
    }

    public initializeRoutes(path: string) {
        Utils.GET(path + 'create', this.router, () => db.assignments.create());

        // drop the table:
        Utils.GET(path + 'drop', this.router, () => db.assignments.drop());

        // remove all assignments:
        Utils.GET(path + 'empty', this.router, () => db.assignments.empty());

        // add a new user product, if it doesn't exist yet, and return the object:
        Utils.POST(path + 'add', this.router, req => {
            return db.task('add-assignment', t => {
                return t.assignments.add(req.body.deck_ID)
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
        });

        Utils.GET(path + 'find/:collection/:id', this.router, req => {
            console.log(req);
            //return db.assignments.findByCollectionId(req.params.collection_ID);
        });

        // find a product by user id + product name id:
        //Utils.GET(path + 'find/:userId/:name', this.router, req => db.assignments.find(req.params));

        //Find assignments by assignmentID
        //Utils.GET(path + 'find/:userId/:name', this.router, req => db.assignments.find(req.params));

        // remove a product by id:
        Utils.GET(path + 'remove/:id', this.router, (req: any) => db.assignments.remove(req.params.id));

        // get all assignments:
        Utils.GET(path + 'all', this.router, () => db.assignments.all());

        // count all assignments:
        Utils.GET(path + 'total', this.router, () => db.assignments.total());

    }

    setDB(db: pgPromise.IDatabase<IExtensions>): void {

    }
}

export default AssignmentController;