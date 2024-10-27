import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById, updateBook } from "../services/api"; // Import API functions

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the book ID from URL parameters
  const navigate = useNavigate(); // Use navigate to redirect after edit
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

  // Fetch the book details when the component mounts
  useEffect(() => {
    const loadBook = async () => {
      if (id) {
        // Check if id is defined
        try {
          const bookData = await fetchBookById(id); // Fetch book details using the new API function
          setBook(bookData); // Set the book data in state
        } catch (error) {
          setError("Failed to fetch book details");
        }
      } else {
        setError("Book ID is not available."); // Handle case where ID is undefined
      }
    };

    loadBook();
  }, [id]);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(null); // Reset any previous error message
    setSuccessMessage(null); // Reset any previous success message

    try {
      if (id) {
        // Ensure id is defined before using it
        await updateBook(id, book); // Call the API function to update the book
        setSuccessMessage("Book updated successfully!"); // Set success message
        navigate("/books"); // Redirect to book list after successful update
      } else {
        setError("Book ID is not available."); // Handle case where ID is undefined
      }
    } catch (error) {
      setError("Failed to update book"); // Set error message if updating fails
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="card">
      <h2>Edit Book</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message if any */}
      {successMessage && (
        <p style={{ color: "green" }}>{successMessage}</p>
      )}{" "}
      {/* Display success message if any */}
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
