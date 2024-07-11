import React, { useEffect, useState } from "react";
import "./AboutUs.css";
import cartImage from "./assets/vecteezy_online-shop-icon-set-vector-for-web-presentation-logo_4262773.jpg";
import profileImage from "./assets/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg";
import facebookLogo from "./assets/9041266_facebook_icon.png";
import xLogo from "./assets/11053969_x_logo_twitter_new_brand_icon.png";
import instagramLogo from "./assets/5279112_camera_instagram_social media_instagram logo_icon.png";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";

const AboutUs: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (typeof token === "string") {
      const payload = jwtDecode<JwtPayload>(token);
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  return (
    <div className="about-us">
      <header className="header">
        <div className="header-left">
          <button
            className="back-button"
            onClick={function () {
              window.location.href = "/";
            }}
          >
            ❮ HOME
          </button>
        </div>
        <div className="header-right">
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
      <main className="main-content">
        <h1>About Us</h1>
        <div className="content-sections">
          <div className="section">
            <h2>What We Are</h2>
            <p>We are HOBIGOWES, a dedicated marketplace connecting cycling enthusiasts with top-quality bicycles from trusted sellers. Our mission is to make finding the perfect bike easy and enjoyable.</p>
          </div>
          <div className="section">
            <h2>Our Vision</h2>
            <p>We envision a world where everyone can enjoy the freedom and joy of cycling. We're constantly innovating and expanding to offer the best selection and service to our customers.</p>
          </div>
          <div className="section">
            <h2>What We Offer</h2>
            <p>From mountain bikes to road bikes to BMX, we offer a wide range of bicycles to suit every style and need. Our platform makes it easy to explore, compare, and buy bikes from trusted sellers.</p>
          </div>
        </div>
        <div className="social-media">
          <h2>Follow Us On:</h2>
          <div className="social-icons">
            <span>
              <img src={facebookLogo} alt="facebook" />
            </span>
            <span>
              <img src={xLogo} alt="X" />
            </span>
            <span>
              <img src={instagramLogo} alt="instagram" />
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
