import BookDto from "../../dtos/bookDto";
// import Book from "../../models/Book";
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
    publishing_company,
    quantity,
    doweySystem
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
    if (!doweySystem && Number.isNaN(doweySystem)){
      errors.push({
        field: "Dowey System",
        message: "Dowey System is required and is a number!"
      })
    }
    if (quantity && !Number.isInteger(quantity)){
      errors.push({
        field: "Quantity",
        message: "Quantity is a number integer!"
      })
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
        doweySystem,
        quantity
      },
    });
    return newBook;
  }
}
