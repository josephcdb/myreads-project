import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Book from '../Book/Book';
import * as BooksAPI from "../../BooksAPI";
import "./SearchBook.css";

const SearchPage = ({ onChangeShelf, myBooks }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    // Update the shelf of a book in the search results based on the user's existing books
    const updateBookShelf = (book) => {
        const existingBook = myBooks.find((b) => b.id === book.id);
        return existingBook || { ...book, shelf: "none" };
    };

    const handleSearch = (value) => {
        setQuery(value);

        if (!value) {
            setResults([]);
            return;
        }

        // Search for books using the BooksAPI and update the results state with the search results
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
        <>
            <div className="searchbooks">
                <button className="searchbooks-close" onClick={() => navigate("/")}>
                    Close
                </button>
                <div className="searchbooks-inputWrapper">
                    <input
                        id="searchbooks-input"
                        name="searchbooks-text"
                        className="searchbooks-inputBar"
                        type="text"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search by title, author, or ISBN"
                    />
                </div>
            </div>
            <div className="searchbooks-results">
                <ol className="searchbooks-grid">
                    {results.map((book) => (
                        <li key={book.id}>
                            <Book book={book} onChangeShelf={onChangeShelf} />
                        </li>
                    ))}
                </ol>
            </div>
        </>
    );
}

SearchPage.propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    myBooks: PropTypes.array.isRequired,
};

export default SearchPage;