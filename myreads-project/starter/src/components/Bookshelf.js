import PropTypes from 'prop-types';
import Book from './Book';

const Bookshelf = ({ title, books, onMoveBook }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <Book key={book.id} book={book} onMoveBook={onMoveBook} />
                    ))}
                </ol>
            </div>
        </div>
    );
}

Bookshelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired,
};

export default Bookshelf;