import PropTypes from 'prop-types';
import "./BookShelfChanger.css";

const BookShelfChanger = ({ onChange, currentShelf, bookId }) => {
    return (
        <div className="bookshelfchanger">
            <select id={`shelf-${bookId}`} name={`shelf-${bookId}`} value={currentShelf} onChange={(e) => onChange(e.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    );
}

BookShelfChanger.propTypes = {
    onChange: PropTypes.func.isRequired,
    currentShelf: PropTypes.string.isRequired,
    bookId: PropTypes.string.isRequired
};

export default BookShelfChanger;