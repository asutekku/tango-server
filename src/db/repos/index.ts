import { UsersRepository } from './users';
import { DecksRepository } from './decks';
import { CollectionsRepository } from './collections';
import { SubjectsRepository } from './subjects';
import { AssignmentsRepository } from './assignments';
import { WordsRepository } from './words';

// Database Interface Extensions:
interface IExtensions {
    users: UsersRepository,
    decks: DecksRepository,
    collections: CollectionsRepository,
    subjects: SubjectsRepository,
    assignments: AssignmentsRepository,
    words: WordsRepository,
    //products: ProductsRepository
}

export {
    IExtensions,
    UsersRepository,
    CollectionsRepository,
    SubjectsRepository,
    AssignmentsRepository,
    WordsRepository,
    DecksRepository
    //ProductsRepository
};
