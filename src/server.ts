import { App } from './app';
import UserController from './controllers/userController';
import CollectionController from './controllers/collectionController';
import DeckController from './controllers/deckController';
import AssignmentController from './controllers/assignmentController';
import SubjectController from './controllers/subjectController';

const app = new App(
    [
        new UserController(),
        new CollectionController(),
        new DeckController(),
        new AssignmentController(),
        new SubjectController()
    ]
);

app.listen();