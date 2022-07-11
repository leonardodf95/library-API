import { v4 } from 'uuid'

export default class Book {
    id: string;
    name: string;
    author: string;
    publishing_company: string;
    language: string;

    constructor(name: string, author: string, publishing_company: string, language: string){
        this.id = v4(),
        this.name = name,
        this.author = author,
        this.publishing_company = publishing_company,
        this.language = language
    }
}