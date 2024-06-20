import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import "./App.css";

function App() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("http://localhost:5000/");
        const data = await response.text();
        setMessage(data);
      } catch (error) {
        console.error("Error fetching message:", error);
        setMessage("Failed to fetch message");
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="App">
      <div className="left-banner">
        <h2 className="logo">HOBIGOWES</h2>
      </div>
      <div className="main-area">
        <form action="" method="get">
          <input type="text" id="input-username" placeholder="Username"></input>
          <input type="password" id="input-password" placeholder="Password"></input>
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