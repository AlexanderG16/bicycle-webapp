import Button from "./components/Button";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="left-banner">
        <h2 className="logo">HOBIGOWES</h2>
      </div>
      <div className="main-area">
        <form action="" method="get">
          <input type="text" id="input-username" placeholder="Username"></input>
          <input type="password" id="input-password" placeholder="Password"></input>
          <input type="email" id="input-email" placeholder="Email"></input>
          <input type="tel" id="input-phone-num" placeholder="+62 |"></input>
          <input type="text" id="input-address" placeholder="Address"></input>
          <Button btnType="btn-signup">Sign Up</Button>
        </form>
        <p>Already Have An Account?</p>
        <a href="/" className="log-in-link">
          <strong>Log In Here</strong>
        </a>
      </div>
    </div>
  );
}

export default App;