import { Router } from "express";
import BooksRoutes from "./books.routes";
import userRoutes from "./user.routes";


const routes = Router()


routes.use('/book', BooksRoutes);

routes.use('/user', userRoutes)



export default routes