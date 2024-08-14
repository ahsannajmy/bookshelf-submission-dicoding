import { nanoid } from "nanoid";
import { books } from "./books.js";

export const addNewBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = reqeust.payload;
};