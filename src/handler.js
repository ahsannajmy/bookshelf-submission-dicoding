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
  } = request.payload;

  const id = nanoid(16);
  const finished = (pageCount === readPage);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  }

  if (name === undefined) {
    return h.response({
      status : 'fail',
      message : 'Gagal menambahkan buku. Mohon isi nama buku'
    }).code(400);
  } 

  if (readPage > pageCount) {
    return h.response({
      status : 'fail',
      message : 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400);
  }

  books.push(newBook)
  return h.response({
    status : 'success',
    message : 'Buku berhasil ditambahkan',
    data : { bookId : id }
  }).code(201);
};

export const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  
  if (name !== undefined) {
    const bookByName = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    return h.response({
      status : 'success',
      data : {
        books : bookByName.map((book) => ({
          id : book.id,
          name : book.name,
          publisher : book.publisher
        }))
      }
    }).code(200);
  }

  if (reading !== undefined) {
    const bookByReading = books.filter((book) => {
      if (reading === '0') {
        return book.reading == '0';
      } else if (reading === '1') {
        return book.reading == 1;
      }
      return true;
    });
    return h.response({
      status : 'success',
      data : {
        books : bookByReading.map((book) => ({
          id : book.id,
          name : book.name,
          publisher : book.publisher
        }))
      }
    }).code(200);
  }

  if (finished !== undefined) {
    const bookByFinished = books.filter((book) => {
      if (finished === '0') {
        return book.finished == 0;
      } else if (finished === '1') {
        return book.finished == 1;
      }
      return true;
    });
    return h.response({
      status : 'success',
      data : {
        books : bookByFinished.map((book) => ({
          id : book.id,
          name : book.name,
          publisher : book.publisher
        }))
      }
    }).code(200);
  }

  

  return h.response({
    status : 'success',
    data : {
      books : books.map((book) => ({
        id : book.id,
        name : book.name,
        publisher : book.publisher
      }))
    }
  })
};

export const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((book) => book.id === bookId)[0];

  if (book) {
    return h.response({
      status : 'success',
      data : { book }
    }).code(200);
  }

  return h.response({
    status : 'fail',
    message : 'Buku tidak ditemukan'
  }).code(404);
};

export const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    if (name === undefined) {
      return h.response({
        status : 'fail',
        message : 'Gagal memperbarui buku. Mohon isi nama buku',
      }).code(400);
    }

    if (readPage > pageCount) {
      return h.response({
        status : 'fail',
        message : 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400);
    }

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    }
    return h.response({
      status : 'success',
      message : 'Buku berhasil diperbarui'
    }).code(200);
  }

  return h.response({
    status : 'fail',
    message : 'Gagal memperbarui buku. Id tidak ditemukan'
  }).code(404);
};

export const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index,1);
    return h.response({
      status : 'success',
      message : 'Buku berhasil dihapus'
    }).code(200);
  }

  return h.response({
    status : 'fail',
    message : 'Buku gagal dihapus. Id tidak ditemukan'
  }).code(404);
};