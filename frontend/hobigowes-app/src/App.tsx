import React, { useState } from "react";
import Button from "./components/Button";
import "./App.css";

function App() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Login successful");
        // Handle token storage and redirect if necessary
        console.log("Token:", data.token);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("Failed to log in");
    }
  };

  return (
    <div className="App">
      <div className="left-banner">
        <h2 className="logo">HOBIGOWES</h2>
      </div>
      <div className="main-area">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="input-username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            id="input-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button btnType="btn-login">Log In</Button>
        </form>
        {message && <p>{message}</p>}
        <p>Don't have an account yet?</p>
        <a href="/sign-up" className="sign-up-link">
          <strong>Sign Up Here</strong>
        </a>
      </div>
    </div>
  );
}

export default App;
