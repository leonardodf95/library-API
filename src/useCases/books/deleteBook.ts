// import BooksRepository from "../../repositories/booksRepository";
import { prisma } from "../../prisma/Client";

export default class DeleteBookUseCase {
  // private _repository: BooksRepository
  // constructor(repository: BooksRepository){
  //     this._repository = repository
  // }

  public execute(id: string): void {
    const deletedBook = prisma.book.delete({
      where: {
        id,
      },
    });
  }
}
