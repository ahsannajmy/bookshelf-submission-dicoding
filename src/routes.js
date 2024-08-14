import { 
  addNewBookHandler, 
  deleteBookByIdHandler, 
  editBookByIdHandler, 
  getAllBooksHandler, 
  getBookByIdHandler 
} from "./handler.js";

export const routes = [
  {
    method : 'POST',
    path : '/books',
    handler : addNewBookHandler
  },
  {
    method : 'GET',
    path : '/books',
    handler : getAllBooksHandler
  },
  {
    method : 'GET',
    path : '/books/{bookId}',
    handler : getBookByIdHandler
  },
  {
    method : 'PUT',
    path : '/books/{bookId}',
    handler : editBookByIdHandler
  },
  {
    method : 'DELETE',
    path : '/books/{bookId}',
    handler : deleteBookByIdHandler
  }
]