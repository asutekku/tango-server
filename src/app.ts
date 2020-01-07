import express from 'express';
import * as bodyParser from 'body-parser';
import { Controller } from './controllers/Controller';

export class App {
    app: express.Application;
    private port: number;

    constructor(controllers: Controller[]) {
        this.port = 3000;
        this.app = express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

}





