import { Book } from "@prisma/client";
import searchErrors from "../../dtos/searchError";
import searchExceptions from "../../exceptions/searchExceptions";
import { prisma } from "../../prisma/Client";

export default class DeleteBookUseCase {
  public async execute(id: string): Promise<void> {
    let errors: searchErrors;
    const searchId: Book | null = await prisma.book.findFirst({
      where: {
        id,
      },
    });

    if (!searchId) {
      throw new searchExceptions(
        (errors = {
          message: "No books were found",
          statusCode: 404,
        })
      );
    }
    const deletedBook = await prisma.book.delete({
      where: {
        id,
      },
    });
  }
}
