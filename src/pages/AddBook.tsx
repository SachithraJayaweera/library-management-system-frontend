import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../services/api';

const AddBook: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    // Basic validation checks
    const newErrors: { [key: string]: string[] } = {};
    if (!title.trim()) newErrors.TitleRequired = ["Title field should be required"];
    if (!author.trim()) newErrors.AuthorRequired = ["Author field should be required"];
    if (!description.trim()) newErrors.DescriptionRequired = ["Description field should be required"];

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await addBook({ title, author, description });
      navigate('/books'); // Redirect to Book List after adding
    } catch (error: any) {
      setErrors(error || { submitError: ["Failed to add book"] });
    }
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
          />
          {errors.TitleRequired && <p style={{ color: "red" }}>{errors.TitleRequired[0]}</p>}
        </div>

        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          {errors.AuthorRequired && <p style={{ color: "red" }}>{errors.AuthorRequired[0]}</p>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.DescriptionRequired && <p style={{ color: "red" }}>{errors.DescriptionRequired[0]}</p>}
        </div>

        <button type="submit" className="button-addbook">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
