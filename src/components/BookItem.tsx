import React from "react";
import { Link } from "react-router-dom";

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
}

interface BookItemProps {
  book: Book;
  onDelete: (id: string) => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, onDelete }) => {
  return (
    <div className="col-md-4">
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">Author: {book.author}</p>
          <p className="card-text">Genre: {book.genre}</p>
          <p className="card-text">Rating: {book.rating}</p>

          <Link to={`/book/${book._id}`} className="btn btn-info me-2">
            Details
          </Link>
          <Link to={`/updateBook/${book._id}`} className="btn btn-primary me-2">
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this book?")
              ) {
                onDelete(book._id);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
