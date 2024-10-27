import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { fetchBooks, deleteBook } from "../services/api"; 
import "../styles/global.css";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]); 

  // Fetch books when the component mounts
  useEffect(() => {
    const loadBooks = async () => {
      const booksData = await fetchBooks();
      setBooks(booksData); 
    };

    loadBooks();
  }, []);

  // Function to handle book deletion with confirmation
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      await deleteBook(id); 
      setBooks(books.filter((book) => book.id !== id)); 
    }
  };

  return (
    <div className="container">
      <div className="table-header">
        <h2>Available Book List</h2>
        <Link to="/add" className="button">
          Add New Book 
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.description}</td>
              <td>
                <Link to={`/edit/${book.id}`} className="edit-button">
                  Edit
                </Link>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
