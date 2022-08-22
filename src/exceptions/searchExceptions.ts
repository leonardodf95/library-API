import searchErrors from "../dtos/searchError";

export default class searchExceptions {
    public errors: searchErrors;
    
    constructor(error: searchErrors){
        this.errors = error
    }
}