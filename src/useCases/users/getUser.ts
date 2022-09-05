import searchErrors from "../../dtos/searchError";
import UserDto from "../../dtos/userDto";
import { prisma } from "../../prisma/Client";
import searchExceptions from "../../exceptions/searchExceptions";

export default class GetUserUseCase {
  
  public async execute(query: string): Promise<UserDto[]> {
    
    let errors : searchErrors;
    const users = await prisma.user.findMany({
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

    if(users.length === 0){
      errors = {
        message: "No users were found",
        statusCode: 404
      }

      throw new searchExceptions(errors)
    }
    
    return users;
  }
}
