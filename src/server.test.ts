// import server from "./server";
// import request from "supertest";
// import {} from "jest";

// const testBook = {
//   id: "",
//   name: "Codigo Limpo",
//   author: "Robert C. Martin",
//   publishing_company: "Alta Books",
//   language: "Português",
// };

// const testBook1 = {
//   name: "Deus e o Estado",
//   author: "Mikhail Bakunin",
//   publishing_company: "Domínio Público",
// };

// const app = server()


// it("should create a book test", async () => {
//   const createBookResponse = await request(app).post("/book").send(testBook);
//   expect(createBookResponse.status).toBe(201);
  
// });

// it("should create a book test without the property language", async () => {
//   const createBookResponse = await request(app)
//     .post("/book")
//     .send(testBook1);
//   expect(createBookResponse.status).toBe(201);
// });

// it("get book list and it has to be 2", async () => {
//   const getListBookResponse = await request(app).get(`/book`);
//   //status 200
//   expect(getListBookResponse.status).toBe(404)
//   //have 2 books
//   expect(getListBookResponse.body).toHaveLength(1);
// });

// it("get book by the name", async () => {
//   const searchBookResponse = await request(app).get(
//     `/book/${testBook1.name}`
//   );
//   // The test has no id as the id is given by the system
//   expect(searchBookResponse.body[0]).toEqual(testBook1);
// });

// it("Should update a book", async () => {
//   const updateBook = {
//     name: "O príncipe",
//     author: "Nicolau Maquiavel",
//     publishing_company: "Penguin-Companhia",
//   };
//   const searchBookResponse = await request(app).get(
//     `/book/${testBook1.name}`
//   );
//   const id = searchBookResponse.body[0].id;
//   const updatedBookResponse = await request(app)
//     .put(`/book/${id}`)
//     .send(updateBook);
//   expect(updatedBookResponse.status).toBe(200)
//   expect(updatedBookResponse.body.name).toEqual(updateBook.name);
//   expect(updatedBookResponse.body.author).toEqual(updateBook.author);
//   expect(updatedBookResponse.body.publishing_company).toEqual(updateBook.publishing_company);
// });

// it("should delete a book", async () => {
//   const searchBookResponse = await request(app).get(
//     `/book/${testBook.name}`
//   );
//   const id = searchBookResponse.body[0].id
//   const deleteBookResponse = await request(app)
//     .delete(`/book/${id}`);
//   expect(deleteBookResponse.status).toBe(200)
//   expect((await request(app).get('/book')).body).toHaveLength(1)
  
// });
