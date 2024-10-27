import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Clear errors before each submit attempt

    try {
      await registerUser(email, password);
      alert("Registration successful");
      navigate("/"); // Redirect to login page
    } catch (error: any) {
      if (error) {
        setErrors(error);
      } else {
        alert("Registration failed");
      }
    }
  };

  return (
    <div className="register-card"> {/* Card wrapper added */}
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.DuplicateUserName && (
            <p style={{ color: "red" }}>{errors.DuplicateUserName[0]}</p>
          )}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errors.PasswordTooShort && (
            <p style={{ color: "red" }}>{errors.PasswordTooShort[0]}</p>
          )}
          {errors.PasswordRequiresNonAlphanumeric && (
            <p style={{ color: "red" }}>
              {errors.PasswordRequiresNonAlphanumeric[0]}
            </p>
          )}
          {errors.PasswordRequiresDigit && (
            <p style={{ color: "red" }}>{errors.PasswordRequiresDigit[0]}</p>
          )}
          {errors.PasswordRequiresLower && (
            <p style={{ color: "red" }}>{errors.PasswordRequiresLower[0]}</p>
          )}
          {errors.PasswordRequiresUpper && (
            <p style={{ color: "red" }}>{errors.PasswordRequiresUpper[0]}</p>
          )}
          {errors.PasswordRequiresUniqueChars && (
            <p style={{ color: "red" }}>
              {errors.PasswordRequiresUniqueChars[0]}
            </p>
          )}
        </div>

        <button type="submit" className="register-button">Register</button>
      </form>

      {/* Link to go back to Login page */}
      <p>
        Already registered? <Link to="/">Go to Login</Link>
      </p>
    </div>
  );
};

export default Register;








