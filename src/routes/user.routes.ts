import { Router } from "express";
import UserDto from "../dtos/userDto";
import FieldExceptions from "../exceptions/fieldExceptions";
import searchExceptions from "../exceptions/searchExceptions";
import DeleteUserUseCase from "../useCases/users/deleteUser";
import GetUserUseCase from "../useCases/users/getUser";
import ListUserUseCase from "../useCases/users/listUser";
import RegisterUserUseCase from "../useCases/users/registrationUser";
import UpdateUserUseCase from "../useCases/users/updateUser";
import { genericExceptionMessage } from "../utils/constants";

const userRoutes = Router();

userRoutes.get('/',async (req, res) => {
    const useCase = new ListUserUseCase()
    const users = await useCase.execute()
    return res.send(users)
})

userRoutes.get('/:query',async (req, res) => {
    try {
        const { query } = req.params
        const useCase = new GetUserUseCase()
        const users = await useCase.execute(query)
        return res.send(users)
    } catch (error) {
        if(error instanceof searchExceptions){
            return res.status(error.errors.statusCode).send(error.errors.message)
        }
        return res.status(500).send(genericExceptionMessage)
    }
})

userRoutes.post('/',async (req, res) => {
    try {
        const useCase = new RegisterUserUseCase()
        const newUser = await useCase.execute(req.body as UserDto)
        return res.status(201).send(newUser)
        
    } catch (error) {
        if(error instanceof FieldExceptions)
        return res.status(error.statusCode).send(error.errors)
    return res.send(genericExceptionMessage)
    }
})

userRoutes.delete('/:id',async (req, res) => {
    const { id } = req.params
    const useCase = new DeleteUserUseCase()
    await useCase.execute(id)
    return res.send({})
})

userRoutes.put('/:id',async (req, res) => {
    try {
        const {id} = req.params
        const {name, email, password, cellNumber} = req.body as UserDto
        const useCase = new UpdateUserUseCase()
        const updateUser = await useCase.execute({id, name, cellNumber, email, password})
        return res.send(updateUser)        
    } catch (error) {
        if(error instanceof FieldExceptions)
        return res.status(error.statusCode).send(error.errors)
    return res.send(genericExceptionMessage)
    }
})

export default userRoutes