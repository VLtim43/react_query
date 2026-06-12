import { http, HttpResponse } from "msw";

const books = [{}];

export const handlers = [
  // GET
  http.get("/api/books", () => {
    return HttpResponse.json(books);
  }),

  // POST
  http.post("/api/books", async ({ request }) => {
    const body = (await request.json()) as { title: string; author: string };

    const book = {
      id: crypto.randomUUID(),
      title: body.title,
      author: body.author,
    };

    books.push(book);

    return HttpResponse.json(book, { status: 201 });
  }),
];
