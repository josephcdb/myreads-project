import PropTypes from 'prop-types';
import BookShelfChanger from "./BookShelfChanger";
import { Link } from "react-router-dom";

const Book = ({ book, onChangeShelf }) => {
    return (
        <div className="book">
            <div className="book-top">
                <Link to={`/book/${book.id}`}>
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks?.thumbnail || ""})`
                        }}
                    >
                    </div>
                </Link>
                
                <BookShelfChanger
                    currentShelf={book.shelf}
                    onChange={(newShelf) => onChangeShelf(book, newShelf)}
                />
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
    );
}

Book.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        imageLinks: PropTypes.shape({
            thumbnail: PropTypes.string
        }),
        authors: PropTypes.array,
        shelf: PropTypes.string,
    }).isRequired,
    onChangeShelf: PropTypes.func.isRequired,
};

export default Book;