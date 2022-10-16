import { Router } from "express";
import BooksRoutes from "./books.routes";
import RentRoutes from "./rent.routes";
import userRoutes from "./user.routes";


const routes = Router()


routes.use('/book', BooksRoutes);

routes.use('/user', userRoutes);

routes.use('/rent', RentRoutes);



export default routes