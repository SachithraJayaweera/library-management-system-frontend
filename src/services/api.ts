
import axios from 'axios';

const API_URL = 'https://localhost:7108/api/Books';
const API_URL_LOGIN = 'https://localhost:7108/login';
const API_URL_REGISTER = 'https://localhost:7108/register';
// Fetch all books
export const fetchBooks = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      'accept': '*/*'
    }
  });
  return response.data; 
};

// Delete a book by ID
export const deleteBook = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      'accept': '*/*'
    }
  });
};

// Add a new book
export const addBook = async (book: { title: string; author: string; description: string }) => {
  await axios.post(API_URL, book, {
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json'
    }
  });
};

// Fetch a book by ID
export const fetchBookById = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json'
    }
    });
    return response.data; 
  };
  
  // Update an existing book
  export const updateBook = async (id: string, book: { title: string; author: string; description: string }) => {
    await axios.put(`${API_URL}/${id}`, book, {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
  };

  //login user
export async function loginUser(email: string, password: string) {
    const response = await fetch(`${API_URL_LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    return response.json();
  }
  
  //register user
  export async function registerUser(email: string, password: string): Promise<void> {
    const response = await fetch(`${API_URL_REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
      body: JSON.stringify({ email, password }),
    });
  

    if (!response.ok) {
      const errorData = await response.json();
      // Check for validation errors
      if (response.status === 400 && errorData.errors) {
        const validationErrors = errorData.errors;
        throw validationErrors;
      }
      throw new Error('Registration failed');
    }
  }