import { nanoid } from "nanoid";
import BookModel from "./BookModel.js";

const postBookHandler = async (request, h) => {
  const {
    title,
    writer,
    publisher,
    totalPage,
    description,
  } = request.payload;
  const _id = `book-${nanoid(16)}`;
  const book = new BookModel({
    _id,
    title,
    writer,
    publisher,
    totalPage,
    description
  });

  book.save();

  return h.response({
    status: 'success',
    data: book,
  }).code(201);
}

const getBooksHandler = async (request, h) => {
  const books = await BookModel.find();
  
  return h.response({
    status: 'success',
    data: books,
  }).code(200);
}

const updateBookHandler = async (request, h) => {
  const { bookId } = request.params;

  if (! await BookModel.findById(bookId)) {
    return h.response({
      status: 'fail',
      message: `book with id ${bookId} not found`,
    }).code(404);
  }

  await BookModel.findByIdAndUpdate(bookId, { ...request.payload });

  return h.response({
    status: 'success',
    message: 'book has been successfully updated',
  });
}

const deleteBookHandler = async (request, h) => {
  const { bookId } = request.params;

  if (! (await BookModel.findById(bookId))) {
    return h.response({
      status: 'fail',
      message: `book with id ${bookId} not found`,
    }).code(404);
  }

  await BookModel.findByIdAndDelete(bookId);
  
  return h.response({
    status: 'success',
    message: 'book has been successfully deleted',
  });
}

export  {
  postBookHandler,
  getBooksHandler,
  updateBookHandler,
  deleteBookHandler,
}