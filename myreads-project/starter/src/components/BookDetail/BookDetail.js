import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as BooksAPI from "../../BooksAPI";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    BooksAPI.get(id).then(setBook);
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <img src={book.imageLinks?.thumbnail} alt={book.title} />
      <p>Author: {book.authors?.join(", ")}</p>
      <p>{book.description}</p>
      <p>Published: {book.publishedDate}</p>
      <p>Average Rating: {book.averageRating}</p>
      <button className="btn btn-primary" onClick={() => navigate("/")}>Return back to Main</button>
    </div>
  );
};

export default BookDetail;