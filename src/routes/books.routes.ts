import { Router } from "express";
import BookDto from "../dtos/bookDto";
import FieldExceptions from "../exceptions/fieldExceptions";
import Book from "../models/Book";
import BooksRepository from "../repositories/booksRepository";
import DeleteBookUseCase from "../useCases/books/deleteBook";
import GetBookUseCase from "../useCases/books/getBook";
import ListBookUseCase from "../useCases/books/listBooks";
import RegisterBookUseCase from "../useCases/books/registrationBook";
import UpdateBookUseCase from "../useCases/books/updateBook";


const booksRoutes = Router()
const repository = new BooksRepository();

//Listagem
booksRoutes.get('/',async (request, response) => {
    const useCase = new ListBookUseCase(repository)
    const books = useCase.execute()
    return response.send(books)
})

//Pesquisa
booksRoutes.get('/:query',async (request, response) => {
    try {
        const { query } = request.params;
        const useCase = new GetBookUseCase(repository)
        const books = useCase.execute( query )
        return response.send(books)
    } catch (error) {
        if(error instanceof FieldExceptions){
            return response.status(404).send(error.errors)
        }   
    }
    
})


//Cadastro
booksRoutes.post('/',async (request, response) => {
    try {
        const useCase = new RegisterBookUseCase(repository)
        const newBook = useCase.execute(request.body as BookDto)        
        return response.status(201).send(newBook)
    } catch (error) {
        if(error instanceof FieldExceptions)
            return response.send(error.errors).status(error.statusCode);
        return response.send({
            message: "An unhandled exception has ocurred"
        })
    }
})

//Edição
booksRoutes.put('/:id',async (request,response) => {
    try {
        const { id } = request.params
        const { name, author, publishing_company, language } = request.body as Book
        const useCase = new UpdateBookUseCase(repository)
        const book = useCase.execute({id,name,author,publishing_company,language})
        return response.send(book)
    } catch (error: any) {
        if(error instanceof FieldExceptions)
            return response.send(error.errors).status(error.statusCode);
        return response.send({
            message: "An unhandled exception has ocurred"
        })
    }
})

//Deletar
booksRoutes.delete('/:id',async (request, response) => {
    try {
        const { id } = request.params
        const useCase = new DeleteBookUseCase(repository)
        useCase.execute(id)
        response.send()
    } catch (error) {
        
    }
})

export default booksRoutes