import server from "./server";
import request from "supertest";
import {} from "jest";

const testBook = {
  id: "",
  name: "Codigo Limpo",
  author: "Robert C. Martin",
  publishing_company: "Alta Books",
  language: "Português",
};

const testBook1 = {
  name: "Deus e o Estado",
  author: "Mikhail Bakunin",
  publishing_company: "Domínio Público",
};

const app = server()


it("should create a book test", async () => {
  const createBookResponse = await request(app).post("/book").send(testBook);
  expect(createBookResponse.status).toBe(201);
  
});

it("should create a book test without the property language", async () => {
  const createBookResponse = await request(app)
    .post("/book")
    .send(testBook1);
  expect(createBookResponse.status).toBe(201);
});

it("get book list and it has to be 2", async () => {
  const getListBookResponse = await request(app).get(`/book`);
  expect(getListBookResponse.body).toHaveLength(2);
});

it("get book by the name", async () => {
  const searchBookResponse = await request(app).get(
    `/book/${testBook1.name}`
  );
  expect(searchBookResponse.body[0].author).toEqual(testBook1.author);
});

it("Should update a book", async () => {
  const updateBook = {
    name: "O príncipe",
    author: "Nicolau Maquiavel",
    publishing_company: "Penguin-Companhia",
  };
  const searchBookResponse = await request(app).get(
    `/book/${testBook1.name}`
  );
  const id = searchBookResponse.body[0].id;
  const updatedBookResponse = await request(app)
    .put(`/book/${id}`)
    .send(updateBook);
  expect(updatedBookResponse.status).toBe(200)
  expect(updatedBookResponse.body.name).toEqual(updateBook.name);
});

it("should delete a book", async () => {
  const searchBookResponse = await request(app).get(
    `/book/${testBook.name}`
  );
  const id = searchBookResponse.body[0].id
  const deleteBookResponse = await request(app)
    .delete(`/book/${id}`);
  expect(deleteBookResponse.status).toBe(200)
  expect((await request(app).get('/book')).body).toHaveLength(1)
  
});
