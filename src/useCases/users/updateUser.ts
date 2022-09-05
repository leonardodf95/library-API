import UserDto from "../../dtos/userDto";
import FieldError from "../../dtos/fieldErrors";
import FieldExceptions from "../../exceptions/fieldExceptions";
import { prisma } from "../../prisma/Client";
import { emailPattern } from "../../utils/regex";

export default class UpdateUserUseCase {
 
    public async execute({ id, name, password, cellNumber, email}: UserDto){
        const errors: FieldError[] = []
        
        if(!name){
            errors.push({
                field: "Name",
                message: "Name is required!"
            })
        }
            
        if (!email) {
            errors.push({
                field: 'email',
                message: 'E-mail is required!',
            });
        }
    
        if (!emailPattern.test(email) && email) {
            errors.push({
                field: 'email',
                message: 'E-mail is invalid!',
            });
        }

        const emailAlreadyInUse = await prisma.user.findFirst({
            where:{
                email,
                NOT:{
                    id
                }
            }
        })

        if(emailAlreadyInUse && email){
            errors.push({
                field: 'E-mail',
                message: 'E-mail is already in use!'
            })
        }

        if(errors.length > 0) {
            throw new FieldExceptions(errors)
        }
        
        const newBook = await prisma.user.update({
            where: { id },
            data: {
                id,
                name,
                cellNumber,
                email,
                password
            }
        })
        return newBook
    }
}