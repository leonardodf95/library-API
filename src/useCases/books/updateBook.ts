import BookDto from "../../dtos/bookDto";
// import Book from "../../models/Book";
// import BooksRepository from "../../repositories/booksRepository";
import FieldError from "../../dtos/fieldErrors";
import FieldExceptions from "../../exceptions/fieldExceptions";
import { prisma } from "../../prisma/Client";

export default class UpdateBookUseCase {
    // private _repository: BooksRepository
    // constructor(repository: BooksRepository){
    //     this._repository = repository
    // }

    public async execute({ id, name, author, language, publishing_company}: BookDto){
        const errors: FieldError[] = []
        
        if(!name){
            errors.push({
                field: "Name",
                message: "Name is required!"
            })
        }
        if(!author){
            errors.push({
                field: "Author",
                message: "Author is required!"
            })
        }
        if(!publishing_company){
            errors.push({
                field: "Publishing Company",
                message: "Publishing company is required!"
            })
        }

        if(errors.length > 0) {
            throw new FieldExceptions(errors)
        }
        // const newBook = new Book({name, author, publishing_company, language})
        // newBook.id = id
        // this._repository.update(newBook)
        const newBook = await prisma.book.update({
            where: { id },
            data: {
                id,
                name,
                author,
                publishing_company,
                language
            }
        })
        return newBook
    }
}