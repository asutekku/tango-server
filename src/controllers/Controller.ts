import { IExtensions } from '../db/repos';
import * as pgPromise from 'pg-promise';

export interface Controller {
    path: string;
    router: any;

    setDB(db: pgPromise.IDatabase<IExtensions>): void;
}