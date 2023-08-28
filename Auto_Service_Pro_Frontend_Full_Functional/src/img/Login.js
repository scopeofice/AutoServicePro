import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export const User=React.createContext();

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user,setUser]=useState(null);
  const nav = useNavigate();

  async function handleLogin() {
    
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        { email, password }
      );
      if (response.status === 200) {
        
          setUser(response.data);
          alert("asd")
          alert(response.data.email);
          nav("/customer");
        
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error", error);
      setErrorMessage("An error occurred while logging in.");
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/registration">Sign Up</Link>
      </p>
    </div>
  );
}

export default LoginPage;
