import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

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
      <button className="btn btn-primary" onClick={() => window.history.back()}>Return back to Main</button>
    </div>
  );
};

export default BookDetail;