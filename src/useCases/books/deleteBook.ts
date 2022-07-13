import BooksRepository from "../../repositories/booksRepository";

export default class DeleteBookUseCase {
    private _repository: BooksRepository
    constructor(repository: BooksRepository){
        this._repository = repository
    }

    public execute(id: string): void {
       this._repository.delete(id)
    }
}