import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BookList from "../components/BookList";
import ErrorMessage from "../components/ErrorMessage";
import FilterOptions from "../components/FilterOptions";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import { deleteBook, fetchBooks } from "../redux/bookSlice";
import { RootState, useAppDispatch } from "../redux/store";

interface Book {
  _id: string;
  imageUrl: string;
  title: string;
  genre: string;
  rating: number;
  author: string;
}

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { books, status } = useSelector((state: RootState) => state.books) as {
    books: Book[];
    status: string;
  };

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [genreFilter, setGenreFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<"title" | "rating">("title");

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id)); // Dispatch delete action to remove book
    }
  };

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((book) => (genreFilter ? book.genre === genreFilter : true))
    .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));

  return (
    <div className="container mt-4 mb-4 pt-5">
      <h1>Book Hub</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterOptions
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className="d-flex justify-content-between mt-3 mb-3">
        <Button variant="primary" onClick={() => dispatch(fetchBooks())}>
          Refresh Books
        </Button>
        <Link to="/createBook" className="btn btn-success">
          Add New Book
        </Link>
      </div>
      {status === "loading" && <Loader />}
      {status === "failed" && <ErrorMessage message="Failed to load books" />}
      {status === "succeeded" && (
        <BookList books={filteredBooks} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Home;
