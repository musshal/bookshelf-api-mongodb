import mongoose from "mongoose";

const BookSchema = mongoose.Schema({
  _id: String,
  title: String,
  writer: String,
  publisher: String,
  totalPage: Number,
  description: String,
});

const BookModel = mongoose.model('Book', BookSchema);

export default BookModel;