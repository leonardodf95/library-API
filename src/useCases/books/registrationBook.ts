import BookDto from "../../dtos/bookDto";
import Book from "../../models/Book";
// import BooksRepository from "../../repositories/booksRepository";
import FieldError from "../../dtos/fieldErrors";
import FieldExceptions from "../../exceptions/fieldExceptions";
import { prisma } from "../../prisma/Client";

export default class RegisterBookUseCase {
  // private _repository: BooksRepository
  // constructor(repository: BooksRepository){
  //     this._repository = repository
  // }

  public async execute({
    name,
    author,
    language,
    publishing_company,
  }: Omit<BookDto, "id">) {
    const errors: FieldError[] = [];

    if (!name) {
      errors.push({
        field: "Name",
        message: "Name is required!",
      });
    }
    if (!author) {
      errors.push({
        field: "Author",
        message: "Author is required!",
      });
    }
    if (!publishing_company) {
      errors.push({
        field: "Publishing Company",
        message: "Publishing company is required!",
      });
    }

    if (errors.length > 0) {
      throw new FieldExceptions(errors);
    }
    // const newBook = new Book({name, author, publishing_company, language})
    // this._repository.add(newBook)
    const newBook = await prisma.book.create({
      data: {
        name,
        author,
        publishing_company,
        language,
      },
    });
    return newBook;
  }
}
