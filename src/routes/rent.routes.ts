import { Router } from "express";
import RentBookDto from "../dtos/rentBookDto";
import UserDto from "../dtos/userDto";
import BookDto from "../dtos/bookDto";
import FieldExceptions from "../exceptions/fieldExceptions";
import searchExceptions from "../exceptions/searchExceptions";
import { genericExceptionMessage } from "../utils/constants";


const rentRoutes = Router();



export default rentRoutes;