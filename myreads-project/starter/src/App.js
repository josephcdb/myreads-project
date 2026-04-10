import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookShelf from "./components/BookShelf/BookShelf";
import BookDetail from "./components/BookDetail/BookDetail";
import SearchBook from "./components/SearchBook/SearchBook";
import Header from "./components/Header/Header";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [books, setBooks] = useState([]);

  // Fetch all books from the BooksAPI and set the state with the books
  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  }, []);
  
  const currentlyReadingBooks = books.filter(book => book.shelf === "currentlyReading");
  const wantToReadBooks = books.filter(book => book.shelf === "wantToRead");
  const readBooks = books.filter(book => book.shelf === "read");

  // Handle changing the shelf of a book and update the state
  const handleChangeShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      const updated = books.filter((b) => b.id !== book.id);

      // If the new shelf is not "none", add the book back to the state with the updated shelf
      setBooks([...updated, { ...book, shelf: newShelf }]);
    });
  };

  return (
    <Router>
      <Routes>
        {/* Main page */}
        <Route path="/" element={
            <div>
              <Header />
              <div className="booklist-content">
                <BookShelf
                  title="Currently Reading"
                  books={currentlyReadingBooks}
                  onChangeShelf={handleChangeShelf}
                />
                <BookShelf
                  title="Want to Read"
                  books={wantToReadBooks}
                  onChangeShelf={handleChangeShelf}
                />
                <BookShelf
                  title="Read"
                  books={readBooks}
                  onChangeShelf={handleChangeShelf}
                />
              </div>
              <div className="booklist-addButton">
                <button className="btn btn-primary" onClick={() => window.location.href = "/search"}>Add a book</button>
              </div>
            </div>
          }
        />
        {/* Search page */}
        <Route path="/search" element={<SearchBook onChangeShelf={handleChangeShelf} myBooks={books} />} />

        {/* Book Detail Page */}
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
