import PropTypes from 'prop-types';

const SearchPage = ({ onClose }) => {
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <button className="close-search" onClick={onClose}>
                    Close
                </button>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid"></ol>
            </div>
        </div>
    );
}

SearchPage.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default SearchPage;