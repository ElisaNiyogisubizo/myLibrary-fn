import React from "react";
import { Form } from "react-bootstrap";

interface FilterOptionsProps {
  genreFilter: string;
  setGenreFilter: (value: string) => void;
  sortBy: "title" | "rating";
  setSortBy: (value: "title" | "rating") => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  genreFilter,
  setGenreFilter,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="d-flex mb-3">
      <Form.Select
        className="me-2"
        value={genreFilter}
        onChange={(e) => setGenreFilter(e.target.value)}
      >
        <option value="">All Genres</option>
        <option value="Fiction">Fiction</option>
        <option value="Non-Fiction">Non-Fiction</option>
        <option value="Biography">Biography</option>
        <option value="Adventure">Adventure</option>
        <option value="Horror">Horror</option>
        <option value="Romance">Romance</option>
        <option value="History">History</option>
        <option value="Science">Science</option>
        <option value="Art">Art</option>
        <option value="Poetry">Poetry</option>
        <option value="Children's">Children's</option>
      </Form.Select>
      <Form.Select
        className="me-2"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as "title" | "rating")}
      >
        <option value="title">Sort by Title</option>
        <option value="rating">Sort by Rating</option>
      </Form.Select>
    </div>
  );
};

export default FilterOptions;
