import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  interface Book {
    title: string;
    author: string;
    genre: string;
    description: string;
    publishDate: string;
  }

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`).then((response) => {
      setBook(response.data);
    });
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Description: {book.description}</p>
      <p>Publication Date: {book.publishDate}</p>
    </div>
  );
};

export default BookDetails;
