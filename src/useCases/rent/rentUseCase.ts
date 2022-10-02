import fieldError from "../../dtos/fieldErrors";
import RentBookDto from "../../dtos/rentBookDto";
import { prisma } from "../../prisma/Client";

export default class RentBookUseCase {
  public async execute({ userId, bookId }: Omit<RentBookDto, "Id">) {
    const errors: fieldError[] = [];

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const book = await prisma.book.findUnique({
        where:{
            id: bookId
        }
    })

    if (!userId || !user) {
      errors.push({
        field: "User ID",
        message: "User ID not found",
      });
    }
    if (!bookId || !book) {
      errors.push({
        field: "Book ID",
        message: "Book ID not found",
      });

      
    }
  }
}
