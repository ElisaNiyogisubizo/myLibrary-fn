import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBook: React.FC = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    rating: "",
    description: "",
    publishDate: "",
    imageUrl: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add book");
      }

      navigate("/"); // Redirect to home page
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error occurred.");
      }
    }
  };

  return (
    <div className="container mt-4 mb-4">
      <h2>Add New Book</h2>
      {error && <p className="alert alert-danger">{error}</p>}{" "}
      {/* Error message */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            name="author"
            className="form-control"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Genre</label>
          <input
            type="text"
            name="genre"
            className="form-control"
            value={book.genre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Rating</label>
          <input
            type="number"
            name="rating"
            className="form-control"
            value={book.rating}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={book.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Publish Date</label>
          <input
            type="date"
            name="publishDate"
            className="form-control"
            value={book.publishDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
