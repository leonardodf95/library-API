import { Router } from "express";
import BookDto from "../dtos/bookDto";
import FieldExceptions from "../exceptions/fieldExceptions";
import searchExceptions from "../exceptions/searchExceptions";
import DeleteBookUseCase from "../useCases/books/deleteBook";
import GetBookUseCase from "../useCases/books/getBook";
import ListBookUseCase from "../useCases/books/listBooks";
import RegisterBookUseCase from "../useCases/books/registrationBook";
import UpdateBookUseCase from "../useCases/books/updateBook";
import { genericExceptionMessage } from "../utils/constants";


const booksRoutes = Router()

//Listagem
booksRoutes.get('/',async (request, response) => {
    const useCase = new ListBookUseCase()
    const books = await useCase.execute()
    return response.send(books)
})

//Pesquisa
booksRoutes.get('/:query',async (request, response) => {
    try {
        const { query } = request.params;
        const useCase = new GetBookUseCase()
        console.log('query', query)
        const books = await useCase.execute( query )
        console.log('books', books)
        return response.send(books)
    } catch (error) {
        if(error instanceof searchExceptions){
            return response.status(error.errors.statusCode).send(error.errors.message)
        }
        return response.status(500).send(genericExceptionMessage)
    }
    
})


//Cadastro
booksRoutes.post('/',async (request, response) => {
    try {
        const useCase = new RegisterBookUseCase()
        const newBook = await useCase.execute(request.body as BookDto)        
        return response.status(201).send(newBook)
    } catch (error) {
        if(error instanceof FieldExceptions)
            return response.send(error.errors).status(error.statusCode);
        return response.send(genericExceptionMessage)
    }
})

//Edição
booksRoutes.put('/:id',async (request,response) => {
    try {
        const { id } = request.params
        const { name, author, publishing_company, quantity, doweySystem } = request.body as BookDto
        const useCase = new UpdateBookUseCase()
        const book = await useCase.execute({id,name,author,publishing_company,quantity,doweySystem})
        return response.send(book)
    } catch (error: any) {
        if(error instanceof FieldExceptions)
            return response.status(error.statusCode).send(error.errors);
        return response.send(genericExceptionMessage)
    }
})

//Deletar
booksRoutes.delete('/:id',async (request, response) => {
    try {
        const { id } = request.params
        const useCase = new DeleteBookUseCase()
        await useCase.execute(id)
        response.send()
    } catch (error) {
        if(error instanceof searchExceptions){
            return response.status(error.errors.statusCode).send(error.errors.message)
        }
        return response.status(500).send(genericExceptionMessage)
    }
})

export default booksRoutes