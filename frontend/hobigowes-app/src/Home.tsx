import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./Login.css";
import "./index.css";
import Button from "./components/Button";
import "./Home.css";
import cartImage from "./assets/vecteezy_online-shop-icon-set-vector-for-web-presentation-logo_4262773.jpg";
import profileImage from "./assets/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg";

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
              <img className="btn-cart-menu" src={cartImage} onClick={function(){location.href="/cart"}}></img>
              <img className="btn-profile-menu" src={profileImage} onClick={function(){location.href="/profile/dashboard"}}></img>

          </>
        ) : (
          <>
            <a href="/signin" className="sign-in-btn">Sign In</a>
            <a href="/signup" className="sign-up-btn">Sign Up</a>
          </>
        )}
        </div>
      </header>
      <section className="hero">
        <div className="hero-content">
          <h1>FIND YOUR PERFECT RIDE</h1>
          <p>Join our community of cycling enthusiasts and discover a wide range of bikes to suit every style and need, quality, convenience, and passion all in one place.</p>
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
