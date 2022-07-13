import FieldExceptions from "../../exceptions/fieldExceptions";
import Book from "../../models/Book";
import BooksRepository from "../../repositories/booksRepository";

export default class GetBookUseCase {
    private _repository: BooksRepository
    constructor(repository: BooksRepository){
        this._repository = repository
    }

    public execute(query: string): Book[] | undefined {
       const books = this._repository.get((x) => x.id.toUpperCase() === query.toUpperCase() || x.name.toUpperCase().includes(query.toUpperCase()))
       if(books?.length === 0 || books === undefined){
        throw new FieldExceptions( [{field: "Books", message: "No books were found"}])
       }
       return books;
    }
}