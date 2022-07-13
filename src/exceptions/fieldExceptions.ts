import fieldError from "../dtos/fieldErrors";

export default class FieldExceptions{
    public errors: fieldError[]
    public statusCode: number = 400;

    constructor(errors: fieldError[]){
        this.errors = errors;
    }
}