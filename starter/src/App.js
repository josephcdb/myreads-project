import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
  
  // Filter the selected books (currently reading, want to read, and read) from the state to pass to the BookShelf component
  const currentlyReadingBooks = books.filter(book => book.shelf === "currentlyReading");
  const wantToReadBooks = books.filter(book => book.shelf === "wantToRead");
  const readBooks = books.filter(book => book.shelf === "read");

  // Handle changing the shelf of a book and update the state
  const handleChangeShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      const updated = books.filter((b) => b.id !== book.id);

      // If the new shelf is "none", remove this book from the shelf
      if (newShelf === "none") {
        setBooks(updated);
        return;
      }

      // If the new shelf is not "none", add the book back to the state with the updated shelf
      setBooks([...updated, { ...book, shelf: newShelf }]);
    });
  };

  return (
    <Router>
      <Routes>
        {/* Main Page */}
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
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          }
        />
        {/* Book Search */}
        <Route path="/search" element={<SearchBook onChangeShelf={handleChangeShelf} myBooks={books} />} />

        {/* Book Detail Page */}
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
