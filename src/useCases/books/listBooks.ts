import Book from "../../models/Book";
import BooksRepository from "../../repositories/booksRepository";

export default class ListBookUseCase {
    private _repository: BooksRepository
    constructor(repository: BooksRepository){
        this._repository = repository
    }

    public execute(): Book[] {
       return this._repository.list()
    }
}