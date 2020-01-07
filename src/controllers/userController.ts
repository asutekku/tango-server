import { Controller } from './Controller';
import * as express from 'express';
import { IExtensions } from '../db/repos';
import * as pgPromise from 'pg-promise';
import { Utils } from './utils';
import db = require('../db');

class UserController implements Controller {
    path: string;
    router: express.Router;

    constructor() {
        this.path = '/users/';
        this.router = express.Router();
        this.initializeRoutes(this.path);
    }

    public initializeRoutes(path: string) {
        // create user table
        Utils.GET(`${path}create`, this.router, () => db.users.create());
        // add some initial records:
        Utils.GET(`${path}init`, this.router, () => db.users.init());
        // remove all records from the table:
        Utils.GET(`${path}empty`, this.router, () => db.users.empty());
        // drop the table:
        Utils.GET(`${path}drop`, this.router, () => db.users.drop());
        // add a new user, if it doesn't exist yet, and return the object:
        Utils.GET(`${path}add/:name`, this.router, req => {
            return db.task('add-user', t => {
                return t.users.findByName(req.params.name)
                    .then(user => {
                        return user || t.users.add(req.params.name);
                    });
            });
        });
        // find a user by id:
        Utils.GET(`${path}find/:id`, this.router, (req: any) => db.users.findById(req.params.id));
        // remove a user by id:
        Utils.GET(`${path}remove/:id`, this.router, (req: any) => db.users.remove(req.params.id));
        // get all users:
        Utils.GET(`${path}all`, this.router, () => db.users.all());
        // count all users:
        Utils.GET(`${path}total`, this.router, () => db.users.total());

    }

    setDB(db: pgPromise.IDatabase<IExtensions>): void {

    }
}

export default UserController;