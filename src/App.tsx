// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './styles/global.css'

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />{" "}
            {/* Login page at the root */}
            <Route path="/register" element={<Register />} />{" "}
            {/* Registration page */}
            <Route path="/books" element={<BookList />} /> {/* BookList page */}
            <Route path="/add" element={<AddBook />} /> {/* AddBook page */}
            <Route path="/edit/:id" element={<EditBook />} />{" "}
            {/* EditBook page */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
