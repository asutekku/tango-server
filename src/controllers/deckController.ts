import { Controller } from './Controller';
import { Router } from 'express';
import { IExtensions } from '../db/repos';
import * as pgPromise from 'pg-promise';
import { Utils } from './utils';
import { deckGET } from '../models/deckGET';
import { Subject } from '../models/Subject';
import db = require('../db');

class DeckController implements Controller {
    path: string;
    router: Router;

    constructor() {
        this.path = '/decks/';
        this.router = Router();
        this.initializeRoutes(this.path);
    }

    public initializeRoutes(path: string) {
        Utils.GET(path + 'create', this.router, () => db.decks.create());

        // drop the table:
        Utils.GET(path + 'drop', this.router, () => db.decks.drop());

        // remove all decks:
        Utils.GET(path + 'empty', this.router, () => db.decks.empty());

        // add a new user product, if it doesn't exist yet, and return the object:

        Utils.POST(path + 'add/', this.router, req => {
            return db.task('add-deck', t => {
                return t.decks.findByNameAndCollection(req.body).then(deck => {
                    console.log(deck);
                    return deck || t.decks.add(req.body);
                });
            });
        });

        Utils.GET(path + 'find/:userId/:collectionId', this.router, req => {
            return db.decks.findByCollectionAndUserID(req.params);
        });

        Utils.GET(`${path}find/:deckID`, this.router, (req: any) => {
            return db.task('find-deck', async t => {
                let deck: deckGET = await t.decks.findById(req.params.deckID);
                deck.object = 'deck';
                deck.url = `${path}find/${req.params.deckID}`;
                deck.words = await t.decks.getWordsFromDeckById(req.params.deckID).then(deck => {
                    return deck.map((d: any) => {
                        let obj: any = {id: d.id};
                        for (let key of Object.keys(d.values)) {
                            obj[key.toLowerCase().replace(' ', '_')] = d.values[key];
                        }
                        return obj;
                    });
                });
                deck.subjects = [];
                for (let key of Object.keys(deck.words[0])) {
                    console.log(key);
                    if (Number.isInteger(parseInt(key))) {
                        await t.subjects.findById(parseInt(key)).then((res: Subject) => {
                            let subject = {
                                id: res.id,
                                name: res.name,
                                description: res.description
                            };
                            deck.subjects.push(subject);
                        });
                    }
                }
                /*let subjects = await Object.keys(deck.words[0]).map(async (key: string, j: number) => {
                    console.log(key);
                    if (key !== 'id') {
                        return await t.subjects.findById(parseInt(key)).then(res => {
                            return res;
                        });
                    }
                });*/
                console.log(deck);
                return deck;
            });
        });

        // find a product by user id + product name id:
        //Utils.GET(path + 'find/:userId/:name', this.router, req => db.decks.find(req.params));

        //Find decks by deckID
        //Utils.GET(path + 'find/:userId/:name', this.router, req => db.decks.find(req.params));

        // remove a product by id:
        Utils.GET(path + 'remove/:id', this.router, (req: any) => db.decks.remove(req.params.id));

        // get all decks:
        Utils.GET(path + 'all', this.router, () => db.decks.all());

        // count all decks:
        Utils.GET(path + 'total', this.router, () => db.decks.total());

    }

    setDB(db: pgPromise.IDatabase<IExtensions>): void {

    }
}

export default DeckController;