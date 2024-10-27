import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById, updateBook } from "../services/api";

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate(); 
  const [book, setBook] = useState<{
    title: string;
    author: string;
    description: string;
  }>({
    title: "",
    author: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success messages


  useEffect(() => {
    const loadBook = async () => {
      if (id) {
        try {
          const bookData = await fetchBookById(id); 
          setBook(bookData); 
        } catch (error) {
          setError("Failed to fetch book details");
        }
      } else {
        setError("Book ID is not available."); 
      }
    };

    loadBook();
  }, [id]);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError(null); 
    setSuccessMessage(null); 

    try {
      if (id) {
        await updateBook(id, book); 
        setSuccessMessage("Book updated successfully!"); 
        navigate("/books"); 
      } else {
        setError("Book ID is not available."); 
      }
    } catch (error) {
      setError("Failed to update book"); 
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="card">
      <h2>Edit Book</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {successMessage && (
        <p style={{ color: "green" }}>{successMessage}</p>
      )}{" "}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Title:
            <input
              type="text"
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Author:
            <input
              type="text"
              value={book.author}
              onChange={(e) => setBook({ ...book, author: e.target.value })}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Description:
            <textarea
              value={book.description}
              onChange={(e) =>
                setBook({ ...book, description: e.target.value })
              }
              required
            />
          </label>
        </div>
        <button type="submit" className="edditbook-button">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;
