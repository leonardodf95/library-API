import UserDto from "../../dtos/userDto";
import FieldError from "../../dtos/fieldErrors";
import FieldExceptions from "../../exceptions/fieldExceptions";
import { prisma } from "../../prisma/Client";
import { emailPattern } from "../../utils/regex";

export default class RegisterUserUseCase {
  
  public async execute({
    name,
    email,
    password,
    cellNumber
  }: Omit<UserDto, "id">) {
    const errors: FieldError[] = [];

    const usingEmail = await prisma.user.findFirst({
      where:{
        email
      }
    })
    if (usingEmail){
      errors.push({
        field: "E-mail",
        message: "E-mail is already in use!"
      })
    }

    if (!email){
      errors.push({
        field: 'E-mail',
        message: 'E-mail is required!',
    });
    }

    if (!emailPattern.test(email)) {
      errors.push({
          field: 'E-mail',
          message: 'E-mail is invalid!',
      });
  }

    if (!password){
      errors.push({
        field: 'Password',
        message: 'Password is required!'
      })
    }
    
    if (!name) {
      errors.push({
        field: "Name",
        message: "Name is required!",
      });
    }

    if (!cellNumber){
      errors.push({
        field: 'Phone number',
        message: 'Phone number is required'
      })
    }
    

    if (errors.length > 0) {
      throw new FieldExceptions(errors);
    }
    
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        cellNumber               
      },
    });
    return newUser;
  }
}
