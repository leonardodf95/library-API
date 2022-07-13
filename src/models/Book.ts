import { v4 } from 'uuid'
import BookDto from '../dtos/bookDto';

// id, name, author,

export default class Book {
    id: string;
    name: string;
    author: string;
    publishing_company: string;
    language: string | undefined;

    constructor({ name, author, language, publishing_company}: Omit<BookDto, 'id'>){
        this.id = v4(),
        this.name = name,
        this.author = author,
        this.publishing_company = publishing_company,
        this.language = language
    }
}