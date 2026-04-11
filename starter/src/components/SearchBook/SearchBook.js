import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Book from '../Book/Book';
import * as BooksAPI from "../../BooksAPI";
import "./SearchBook.css";

const SearchPage = ({ onChangeShelf, myBooks }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const timeoutRef = useRef(null);
    const currentQuery = useRef("");

    // Update the shelf of a book in the search results based on the user's existing books
    const updateBookShelf = (book) => {
        const existingBook = myBooks.find((b) => b.id === book.id);
        return existingBook
            ? { ...book, shelf: existingBook.shelf }
            : { ...book, shelf: "none" };
    };

    // Update search results when myBooks changes to reflect any shelf changes on the main page
    useEffect(() => {
        setResults((prevResults) =>
            prevResults.map((book) => {
                const existingBook = myBooks.find((b) => b.id === book.id);
                return existingBook
                    ? { ...book, shelf: existingBook.shelf }
                    : { ...book, shelf: "none" };
            })
        );
    }, [myBooks]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleSearch = (value) => {
        setQuery(value);
        currentQuery.current = value;

        if (!value) {
            setResults([]);
            return;
        }

        // Search for books using the BooksAPI and update the results state with the search results
        BooksAPI.search(value, 20).then((books) => {
            // Prevent state update if component is unmounted
            if (currentQuery.current !== value) return;

            if (books && !books.error) {
                const updatedResults = books.map(updateBookShelf);
                setResults(updatedResults);
            } else {
                setResults([]);
            }
        });
    };

    const handleShelfChange = (book, shelf) => {
        onChangeShelf(book, shelf);

        // update local search results immediately
        setResults((prevResults) =>
            prevResults.map((b) =>
                b.id === book.id ? { ...b, shelf } : b
            )
        );

        // Show notification message
        if (shelf === "none") {
            setMessage(`"${book.title}" removed from shelf`);
        } else {
            setMessage(`"${book.title}" added to ${shelf} section`);
        }

        // Clear after 4 seconds
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setMessage("");
        }, 4000);
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

            {/* Show notification message when a book is added on main page */}
            {message && (
                <div className="searchbooks-notification">
                    {message}
                </div>
            )}

            <div className="searchbooks-results">
                <ol className="searchbooks-grid">
                    {results.map((book) => (
                        <li key={book.id}>
                            <Book book={book} onChangeShelf={handleShelfChange} />
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