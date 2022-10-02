export default interface RentBookDto {
   Id?: Number
   userId: string;
   bookId: string;
   rentBegin: Date;
   rentFinish: Date;
   penalty: Number;
}