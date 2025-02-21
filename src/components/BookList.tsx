import React from "react";
import BookItem from "./BookItem";

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
}

interface BookListProps {
  books: Book[];
  onDelete: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onDelete }) => {
  return (
    <div className="row">
      {books.length > 0 ? (
        books.map((book) => (
          <BookItem key={book._id} book={book} onDelete={onDelete} />
        ))
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
};

export default BookList;
