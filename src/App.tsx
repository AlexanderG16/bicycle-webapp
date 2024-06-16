import Button from "./components/Button";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="left-banner">
        <h2 className="logo">HOBIGOWES</h2>
      </div>
      <div className="main-area">
        <form action="">
          <label className="username-label" htmlFor="input-username">
            username
          </label>
          <input type="text" id="input-username"></input>
          <label className="password-label" htmlFor="input-password">
            password
          </label>
          <input type="password" id="input-password"></input>
          <Button btnType="btn-login">Log In</Button>
        </form>
        <p>Don't have An Account Yet?</p>
        <a href="" className="sign-up-link">
          <strong>Sign Up Here</strong>
        </a>
      </div>
    </div>
  );
}

export default App;
