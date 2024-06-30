import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./index.css";
import Button from "./components/Button";
import "./Home.css";
import "./Header.css";
import cartImage from "./assets/vecteezy_online-shop-icon-set-vector-for-web-presentation-logo_4262773.jpg";
import profileImage from "./assets/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
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
              <img
                className="btn-cart-menu"
                src={cartImage}
                onClick={function () {
                  location.href = "/cart";
                }}
              ></img>
              <img
                className="btn-profile-menu"
                src={profileImage}
                onClick={function () {
                  location.href = "/profile";
                }}
              ></img>
            </>
          ) : (
            <div className="header-links">
              <a href="/signin" className=" sign-in-btn">
                Sign In
              </a>
              <a href="/signup" className=" sign-up-btn">
                Sign Up
              </a>
            </div>
          )}
        </div>
      </header>
      <section className="hero">
        <div className="hero-content">
          <div className="slogan">
            <h1>FIND YOUR PERFECT RIDE!</h1>
            <h1>FIND YOUR PERFECT RIDE!</h1>
            <h1>FIND YOUR PERFECT RIDE!</h1>
          </div>
          <p>Join our community of cycling enthusiasts and discover a wide range of bikes to suit every style and need, quality, convenience, and passion all in one place.</p>
          <div className="hero-buttons">
            <Button btnType="browse-listing">Browse Listings</Button>
            <Button btnType="about-us">About Us</Button>
          </div>
        </div>
      </section>

      <div className="search-bar-create-post">
        <input type="text" placeholder="Search" className="search-bar" />
        <Button btnType="create-post">Create Post</Button>
      </div>

      <div className="post-area">
        <div className="post">
          <div className="post-img"></div>
          <div className="post-description">
            <h3 className="post-title">Polygon Strattos 2022</h3>
            <p className="post-loc">Bandung, Jawa Barat</p>
            <h2 className="price">Rp. 3.800.000</h2>
            <p className="upload-time">5 hours ago</p>
          </div>
        </div>
        <div className="post">
          <div className="post-img"></div>
          <div className="post-description">
            <h3 className="post-title">Polygon Strattos 2022</h3>
            <p className="post-loc">Bandung, Jawa Barat</p>
            <h2 className="price">Rp. 3.800.000</h2>
            <p className="upload-time">5 hours ago</p>
          </div>
        </div>
        <div className="post">
          <div className="post-img"></div>
          <div className="post-description">
            <h3 className="post-title">Polygon Strattos 2022</h3>
            <p className="post-loc">Bandung, Jawa Barat</p>
            <h2 className="price">Rp. 3.800.000</h2>
            <p className="upload-time">5 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
