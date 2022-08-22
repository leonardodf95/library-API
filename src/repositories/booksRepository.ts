// import Book from "../models/Book";

// export default class BooksRepository{
//     private _books: Book[];

//     constructor(){
//         this._books = []
//     }

//     public list(): Book[] {
//         return this._books;
//     }

//     public add(book: Book): void {
//         this._books.push(book);
//     }

//     public update(book: Book): void {
//         const bookFoundIndex = this._books.findIndex((x)=> x.id.toLowerCase() === book.id.toLowerCase());

//         if(bookFoundIndex === -1) return;

//         this._books[bookFoundIndex] = book;
//     }

//     public delete(id: string):void {
//         this._books = this._books.filter((book) => book.id.toUpperCase() !== id.toUpperCase())
//     }

//     public get(predicate: (value: Book) => boolean): Book[] | undefined {
//         return this._books.filter(predicate)
//     }

// }