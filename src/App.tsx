import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BookDetails from "./Pages/BookDetails";
import CreateBook from "./Pages/CreateBook";
import EditBook from "./Pages/EditBook";
import Home from "./Pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/createBook" element={<CreateBook />} />
        <Route path="/updateBook/:id" element={<EditBook />} />
      </Routes>
    </Router>
  );
}

export default App;
