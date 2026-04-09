import PropTypes from 'prop-types';

const BookShelfChanger = ({ onChange, currentShelf }) => {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <div className="book-shelf-changer">
            <select value={currentShelf} onChange={handleChange}>
                <option value="none" disabled>
                    Move to...
                </option>
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
    currentShelf: PropTypes.string.isRequired
};

export default BookShelfChanger;