import React, { useState } from "react";
import Button from "./components/Button";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username == "" || password == "") {
      setMessage("username and password must be filled!");
    } else {
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
          navigate("/");

          var token = data.token;
          var expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + 1 * 60 * 60 * 1000); // 1 hour in milliseconds

          var cookieString = "token=" + token + "; expires=" + expirationDate.toUTCString() + "; path=/";

          document.cookie = cookieString;
        } else {
          const errorData = await response.json();
          setMessage(errorData.message);
        }
      } catch (error) {
        console.error("Error logging in:", error);
        setMessage("Failed to log in");
      }
    }
  };

  return (
    <div className="App">
      <div className="left-banner">
        <h2 className="logo">HOBIGOWES</h2>
      </div>
      <div className="main-area">
        <form action="" onSubmit={handleSubmit}>
          <input type="text" id="input-username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

          <input type="password" id="input-password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <Button btnType="btn-login">Log In</Button>
        </form>
        {message && <p>{message}</p>}
        <p>Don't have an account yet?</p>
        <a href="/signup" className="signup-link">
          <strong>Sign Up Here</strong>
        </a>
      </div>
    </div>
  );
}

export default Login;
