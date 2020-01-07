import { Controller } from './Controller';
import { Router } from 'express';
import { IExtensions } from '../db/repos';
import * as pgPromise from 'pg-promise';
import { Utils } from './utils';
import db = require('../db');

class CollectionController implements Controller {
    path: string;
    router: Router;

    constructor() {
        this.path = '/collections/';
        this.router = Router();
        this.initializeRoutes(this.path);
    }

    public initializeRoutes(path: string) {
        Utils.GET(path + 'create', this.router, () => db.collections.create());

        // drop the table:
        Utils.GET(path + 'drop', this.router, () => db.collections.drop());

        // remove all collections:
        Utils.GET(path + 'empty', this.router, () => db.collections.empty());

        // add a new user product, if it doesn't exist yet, and return the object:
        Utils.POST(path + 'add', this.router, req => {
            return db.task('add-collection', t => {
                return t.collections.findByName(req.body.name).then(deck => {
                    console.log('here?');
                    return deck || t.collections.add(req.body);
                });
            });
        });

        // find a product by user id + product name id:
        //Utils.GET(path + 'find/:userId/:name', this.router, req => db.collections.find(req.params));

        //Find decks by collectionID
        //Utils.GET(path + 'find/:userId/:name', this.router, req => db.collections.find(req.params));

        //Find decks by userID/collectionID/
        Utils.GET(path + 'find/:userId/:collectionId', this.router, req => db.collections.findByCollectionAndUserID(req.params));

        // Find collections by userID
        Utils.GET(path + 'find/:userId', this.router, req => db.collections.findByUserId(req.params));

        // remove a product by id:
        Utils.GET(path + 'remove/:id', this.router, (req: any) => db.collections.remove(req.params.id));

        // get all collections:
        Utils.GET(path + 'all', this.router, () => db.collections.all());

        // count all collections:
        Utils.GET(path + 'total', this.router, () => db.collections.total());

    }

    setDB(db: pgPromise.IDatabase<IExtensions>): void {

    }
}

export default CollectionController;