import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as BooksAPI from "../../BooksAPI";
import "./BookDetail.css";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    BooksAPI.get(id).then(setBook);
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="bookdetail">
      <h1>{book.title}</h1>
      <img src={book.imageLinks?.thumbnail} alt={book.title} />
      <p className="bookdetail-author">Author: {book.authors?.join(", ")}</p>
      <p className="bookdetail-description">{book.description}</p>
      <p className="bookdetail-published">Published: {book.publishedDate}</p>
      <p className="bookdetail-rating">Average Rating: {book.averageRating}</p>
      <button className="btn btn-primary" onClick={() => navigate("/")}>Return back to Main</button>
    </div>
  );
};

export default BookDetail;