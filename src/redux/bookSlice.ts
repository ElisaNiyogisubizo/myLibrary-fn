import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store"; // Ensure correct path

const API_URL = "http://localhost:5000/api/books";

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  description?: string;
  publishDate?: string;
  imageUrl?: string;
}

interface BooksState {
  books: Book[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: BooksState = {
  books: [],
  status: "idle",
  error: null,
};

// Fetch Books
export const fetchBooks = createAsyncThunk<Book[]>(
  "books/fetchBooks",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

// Add a Book
export const addBook = createAsyncThunk<Book, Omit<Book, "_id">>(
  "books/addBook",
  async (newBook) => {
    const response = await axios.post(API_URL, newBook);
    return response.data;
  }
);

// Delete a Book
export const deleteBook = createAsyncThunk<string, string>(
  "books/deleteBook",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

// Update a Book
export const updateBook = createAsyncThunk<
  Book,
  { id: string; updatedData: Partial<Book> }
>("books/updateBook", async ({ id, updatedData }) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
});

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetching Books
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.books = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch books";
      })

      // Add Book
      .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.books.push(action.payload);
      })

      // Delete Book
      .addCase(deleteBook.fulfilled, (state, action: PayloadAction<string>) => {
        state.books = state.books.filter((book) => book._id !== action.payload);
      })

      // Update Book
      .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
        const index = state.books.findIndex(
          (book) => book._id === action.payload._id
        );
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      });
  },
});

export default bookSlice.reducer;

export const selectBooks = (state: RootState) => state.books.books;
