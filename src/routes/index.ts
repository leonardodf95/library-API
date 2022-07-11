import { Router } from "express";
import BooksRoutes from "./books.routes";


const routes = Router()

//Admin --login, cadastro de livro, editar livro, excluir livro, listar livros,
routes.use('/book', BooksRoutes);


//Users --Listagem, pesquisas, login --favoritos, reservas.

export default routes