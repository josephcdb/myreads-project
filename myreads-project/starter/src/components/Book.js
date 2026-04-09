import PropTypes from 'prop-types';
import BookShelfChanger from "./BookShelfChanger";

const Book = ({ book }) => {
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: `${book.width}`,
                            height: `${book.height}`,
                            backgroundImage: `url(${book.link})`,
                        }}
                    ></div>
                    <div className="book-shelf-changer">
                        <BookShelfChanger
                            currentShelf={book.shelf}
                            onChange={(newShelf) => {
                                // Handle shelf
                                book.shelf = newShelf;
                            }}
                        />
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        </li>
    );
}

Book.propTypes = {
    book: PropTypes.shape({
        link: PropTypes.string,
        title: PropTypes.string,
        authors: PropTypes.array,
        width: PropTypes.string,
        height: PropTypes.string,
        shelf: PropTypes.string,
    }).isRequired,
};

export default Book;