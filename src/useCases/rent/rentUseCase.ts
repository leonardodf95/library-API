import fieldError from "../../dtos/fieldErrors";
import RentBookDto from "../../dtos/rentBookDto";
import { prisma } from "../../prisma/Client";
import { DateTime } from "luxon";
import UpdateBookUseCase from "../books/updateBook";
import BookDto from "../../dtos/bookDto";
import FieldExceptions from "../../exceptions/fieldExceptions";

export default class RentBookUseCase {
  public async execute({ userId, bookId }: Omit<RentBookDto, "Id">) {
    const errors: fieldError[] = [];
    
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select:{
        id: true,
        name: true
      }
    });

    const book = await prisma.book.findUnique({
        where:{
            id: bookId
        }
    });


    if (!userId || !user) {
      errors.push({
        field: "User ID",
        message: "User ID not found",
      });
    };
    if (!bookId || !book) {
      errors.push({
        field: "Book ID",
        message: "Book ID not found",
      });      
    };

    if(book?.quantity <= 0){
      errors.push({
        field: "Quantity",
        message: `No have more book's ${book.name}`
      })
    }

    if (errors.length > 0) {
      throw new FieldExceptions(errors);
    }

    const timeStamp = DateTime.local().toISO({ includeOffset: true});
    console.log('timeStamp :>> ', timeStamp);
    const rentBegin = new Date(timeStamp)
        
    const rentDateFinish = DateTime.local().plus({days:7}).toISO({includeOffset: true})
    const rentFinish = new Date(rentDateFinish)
    
    

    const newRent = await prisma.bookRents.create({
      data:{
        userID: userId,
        bookId,
        rentBegin,
        rentFinish
      }
    })

    book?.quantity -= 1
    const {id, name, author, publishing_company, quantity, doweySystem } = book as BookDto
    
    const upgradeBook = new UpdateBookUseCase()
    upgradeBook.execute({id, name, author, publishing_company, quantity , doweySystem})
    
    return newRent;
  }
}
