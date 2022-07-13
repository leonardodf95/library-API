import { Router } from "express";
import BooksRoutes from "./books.routes";


const routes = Router()


routes.use('/book', BooksRoutes);

//Admin --> Listar*, pesquisa, delete, alteração
//User --> Listar*, pesquisa, reservar



export default routes