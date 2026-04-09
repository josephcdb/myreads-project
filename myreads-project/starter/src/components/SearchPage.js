import { useState } from "react";
import PropTypes from 'prop-types';
import Book from './Book';
import * as BooksAPI from "../BooksAPI";

const SearchPage = ({ onClose, onChangeShelf, myBooks }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const updateBookShelf = (book) => {
        const existing = myBooks.find((b) => b.id === book.id);
        return existing || { ...book, shelf: "none" };
    };

    const handleSearch = (value) => {
        setQuery(value);

        if (!value) {
            setResults([]);
            return;
        }

        BooksAPI.search(value, 20).then((books) => {
            if (books && !books.error) {
                const updatedResults = books.map(updateBookShelf);
                setResults(updatedResults);
            } else {
                setResults([]);
            }
        });
    };

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <button className="close-search" onClick={onClose}>
                    Close
                </button>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search by title, author, or ISBN"
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {results.map((book) => (
                        <li key={book.id}>
                            <Book book={book} onChangeShelf={onChangeShelf} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

SearchPage.propTypes = {
    onClose: PropTypes.func.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    myBooks: PropTypes.array.isRequired,
};

export default SearchPage;