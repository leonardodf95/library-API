import { Router } from "express";
import RentBookDto from "../dtos/rentBookDto";
import UserDto from "../dtos/userDto";
import BookDto from "../dtos/bookDto";
import FieldExceptions from "../exceptions/fieldExceptions";
import searchExceptions from "../exceptions/searchExceptions";
import { genericExceptionMessage } from "../utils/constants";
import RentBookUseCase from "../useCases/rent/rentUseCase";


const rentRoutes = Router();

rentRoutes.post('/', async (req, res) => {
    try {
        const useCase = new RentBookUseCase();
        const newRent = await useCase.execute(req.body as RentBookDto);
        return res.status(201).send(newRent);
    } catch (error) {
        if(error instanceof FieldExceptions)
        return res.status(error.statusCode).send(error.errors)
    return res.status(500).send(genericExceptionMessage)
    }
})


export default rentRoutes;