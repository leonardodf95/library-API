// import Book from "../../models/Book";
// import BooksRepository from "../../repositories/booksRepository";
import BookDto from "../../dtos/bookDto"
import { prisma } from "../../prisma/Client"


export default class ListBookUseCase {
    // private _repository: BooksRepository
    // constructor(repository: BooksRepository){
    //     this._repository = repository
    // }

    public async execute(): Promise<BookDto[]> {
       const books = prisma.book.findMany()
       return books
    }
}