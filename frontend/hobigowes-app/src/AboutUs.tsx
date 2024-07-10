import React from "react";
import "./AboutUs.css";

const AboutUs: React.FC = () => {
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
          <button className="cart-button">🛒</button>
          <button className="user-button">👤</button>
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
            <span>📘</span>
            <span>🕊️</span>
            <span>📸</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
