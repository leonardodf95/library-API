// import FieldExceptions from "../../exceptions/fieldExceptions";
// import Book from "../../models/Book";
import searchErrors from "../../dtos/searchError";
import BookDto from "../../dtos/bookDto";
import { prisma } from "../../prisma/Client";
import searchExceptions from "../../exceptions/searchExceptions";
// import BooksRepository from "../../repositories/booksRepository";

export default class GetBookUseCase {
  // private _repository: BooksRepository
  // constructor(repository: BooksRepository){
  //     this._repository = repository
  // }

  public async execute(query: string): Promise<BookDto[]> {
    //    const books = this._repository.get((x) => x.id.toUpperCase() === query.toUpperCase() || x.name.toUpperCase().includes(query.toUpperCase()))
    //    if(books?.length === 0 || books === undefined){
    //     throw new FieldExceptions( [{field: "Books", message: "No books were found"}])
    //    }
    let errors : searchErrors;
    const books = await prisma.book.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            id: {
              contains: query,
            },
          },
        ],
      },
    });

    if(books.length === 0){
      errors = {
        message: "No books were found",
        statusCode: 404
      }

      throw new searchExceptions(errors)
    }
    
    return books;
  }
}
