import { Router } from "express";
import Book from "../models/Book";
import BooksRepository from "../repositories/booksRepository";

const booksRoutes = Router()
const repository = new BooksRepository();

//Listagem
booksRoutes.get('/',async (req, res) => {
    const books = repository.list()
    return res.send(books)
})

//Pesquisa
booksRoutes.get('/:id',async (req, res) => {
    const { id } = req.params;
    const book = repository.getById(id)
    if (!book) {
        return res.status(404).send()
    }
    return res.send(book)
})

//Cadastro
booksRoutes.post('/',async (req, res) => {
    try {
        const {name,author,publishing_company,language} = req.body as Book
        const newBook = new Book(name, author, publishing_company, language)
        repository.add(newBook)
        return res.status(201).send(newBook)
    } catch (error) {
        return res.send({
            message: error.message
        })    ;    
    }
})

//Edição
booksRoutes.put('/:id',async (req,res) => {
    try {
        const { id } = req.params
        const { name, author, publishing_company, language } = req.body as Book
        // const books = repository.list()
        // const bookFoundIndex = books.findIndex((book) => book.id === id)
        const book = new Book(name, author, publishing_company, language);
        book.id = id
        repository.update(book)
        return res.send(book)
    } catch (error) {
        return res.send({ message: error.message})
    }
})

booksRoutes.delete('/:id',async (req, res) => {
    try {
        const {id} = req.params;

        repository.delete(id)
        res.send()
    } catch (error) {
        
    }
})

export default booksRoutes