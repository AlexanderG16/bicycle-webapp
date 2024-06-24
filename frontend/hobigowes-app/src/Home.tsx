import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./Login.css";
import "./index.css";
import Button from "./components/Button";
import "./Home.css";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = Cookies.get('token');
    if (typeof token === "string") {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);
  return (
    <div className="home">
      <header className="header">
        <h2 className="logo">HOBIGOWES</h2>
        <div className="auth-links">
        {isAuthenticated ? (
          <>
            <Button btnType="btn-cart-menu"></Button>
            <Button btnType="btn-profile-menu"></Button>
          </>
        ) : (
          <>
            <a href="/signin">Sign In</a>
            <a href="/signup">Sign Up</a>
            <Button btnType="btn-cart-menu"></Button>
          </>
        )}
        </div>
      </header>
      <section className="hero">
        <div className="hero-content">
          <h1>FIND YOUR PERFECT RIDE</h1>
          <p>Join our community of cycling enthusiasts and discover the best bikes for sale near you.</p>
          <div className="hero-buttons">
            <Button btnType="btn-browse-listing">Browse Listings</Button>
            <Button btnType="btn-about-us">About Us</Button>
          </div>
        </div>
      </section>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
         <Button btnType="btn-create-post">Create Post</Button>
      </div>
    </div>
  );
};

export default Home;
