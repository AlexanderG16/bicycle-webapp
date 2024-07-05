import Button from "./components/Button";
import "./Login.css";
import "./Form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNUmber] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username == "" || password == "" || email == "" || phoneNumber == "") {
      setMessage("all the fields must be filled!");
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, email, phoneNumber }),
        });

        if (response.ok) {
          const data = await response.json();
          navigate("/");
          // setMessage("Sign Up successful");
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
        <form className="form-signup" onSubmit={handleSubmit}>
          <input type="text" id="input-username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>

          <input type="password" id="input-password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>

          <input type="email" id="input-email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>

          <input type="tel" id="input-phone-num" placeholder="+62 |" onChange={(e) => setPhoneNUmber(e.target.value)}></input>

          <input type="text" id="input-address" placeholder="Address"></input>

          <Button btnType="btn-signup">Sign Up</Button>
        </form>
        {message && <p>{message}</p>}
        <p>Already Have An Account?</p>
        <a href="/" className="log-in-link">
          <strong>Log In Here</strong>
        </a>
      </div>
    </div>
  );
}

export default App;
