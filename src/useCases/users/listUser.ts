import UserDto from "../../dtos/userDto"
import { prisma } from "../../prisma/Client"


export default class ListUserUseCase {
    
    public async execute(): Promise<UserDto[]> {
       const users = await prisma.user.findMany()
       return users
    }
}