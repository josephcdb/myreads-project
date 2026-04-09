import { useState, useEffect } from "react";
import Header from "./components/Header";
import Bookshelf from "./components/Bookshelf";
import SearchPage from "./components/SearchPage";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

function App() {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  }, []);
  
  const currentlyReadingBooks = books.filter(book => book.shelf === "currentlyReading");
  const wantToReadBooks = books.filter(book => book.shelf === "wantToRead");
  const readBooks = books.filter(book => book.shelf === "read");

  const handleChangeShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      const updated = books.filter((b) => b.id !== book.id);
      setBooks([...updated, { ...book, shelf: newShelf }]);
    });
  };

  return (
    <div className="app">
      { showSearchPage ? 
        (<SearchPage 
          onClose={() => setShowSearchPage(false)}
          onChangeShelf={handleChangeShelf}
          myBooks={books}
        />) :
      (
        <>
          <div className="list-books">
            <Header />
            <div className="list-books-content">
              <Bookshelf title="Currently Reading" books={currentlyReadingBooks} onChangeShelf={handleChangeShelf} />
              <Bookshelf title="Want to Read" books={wantToReadBooks} onChangeShelf={handleChangeShelf} />
              <Bookshelf title="Read" books={readBooks} onChangeShelf={handleChangeShelf} />
            </div>
          </div>
          <div className="open-search">
            <button onClick={() => setShowSearchPage(!showSearchPage)}>Add a book</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
