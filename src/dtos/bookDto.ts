export default interface BookDto{
    id: string;
    name: string;
    author: string;
    publishing_company: string;
    language?: string | null;
}