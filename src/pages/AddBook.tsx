import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../services/api';

const AddBook: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook({ title, author, description });
    navigate('/books'); // Redirect to Book List after adding
  };

  return (
    <div className="card">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button-addbook">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
