import React from "react";
import "./Login.css";
import "./index.css";
import Button from "./components/Button";

const Home = () => {
  return (
    <div className="home">
      <nav>
        <h2 className="logo">HOBIGOWES</h2>

        <Button btnType="btn-cart-menu"></Button>
        <Button btnType="btn-profile-menu"></Button>
      </nav>
    </div>
  );
};

export default Home;
