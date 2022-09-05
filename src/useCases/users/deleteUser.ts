import { prisma } from "../../prisma/Client";

export default class DeleteUserUseCase {

  public execute(id: string): void {
    const deletedUser = prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
