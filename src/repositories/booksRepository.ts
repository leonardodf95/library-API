import Book from "../models/Book";
import booksRoutes from "../routes/books.routes";

export default class BooksRepository{
    private _books: Book[];

    constructor(){
        this._books = []
    }

    public list(): Book[] {
        return this._books;
    }

    // public getByName(name: string): Book {
    //     const books: Book[] = this._books.map((x)=> {
    //         if(x.name.toLowerCase().includes(name.toLowerCase())){
    //             return x
    //         }
    //     })
    //     return books;
    // }

    public getById(id: string): Book | undefined {
        return this._books.find((book) => book.id.toLowerCase() === id.toLowerCase())
    }

    public add(book: Book): void {
        this._books.push(book);
    }

    public update(book: Book): void {
        const bookFoundIndex = this._books.findIndex((x)=> x.id.toLowerCase() === book.id.toLowerCase());

        if(bookFoundIndex === -1) return;

        this._books[bookFoundIndex] = book;
    }

    public delete(id: string):void {
        this._books = this._books.filter((book) => book.id.toLowerCase() !== id.toLowerCase())
    }

}