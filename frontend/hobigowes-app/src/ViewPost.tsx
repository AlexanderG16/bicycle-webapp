import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./index.css";
import Button from "./components/Button";
import "./Home.css";
import { useLoaderData } from "react-router-dom";
import "./ViewPost.css";
import Post from "../../../backend/src/models/post";
import cartImage from "./assets/vecteezy_online-shop-icon-set-vector-for-web-presentation-logo_4262773.jpg";
import profileImage from "./assets/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg";
import { jwtDecode, JwtPayload } from "jwt-decode";

const ViewPost = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (typeof token === "string") {
      const payload = jwtDecode<JwtPayload>(token);
      setIsAuthenticated(true);

      const role = Number(payload.role);
      if (!isNaN(role) && role === 1) {
        setIsSeller(true);
      }
    }
  }, [isAuthenticated, isSeller]);

  const res = useLoaderData() as Post;

  return (
    <div className="product-view">
      <header className="header">
        <div className="header-left">
          <button className="back-button">❮</button>
          <h1 className="logo">HOBIGOWES</h1>
        </div>
        <div className="header-center">
          <input type="text" className="search-bar" placeholder="Search" />
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
      <div className="carousel">
        <button className="carousel-button left-button">❮</button>
        <img
          src="https://your-image-source-url.com"
          alt="Product Image"
          className="carousel-image"
        />
        <button className="carousel-button right-button">❯</button>
      </div>
      <div className="product-details">
        <div className="product-info">
          <h2>{res.title}</h2>
          <p className="location">
            <span className="icon">📍</span>
            {res.city}, {res.province}
          </p>
          <button className="seller-dashboard">View Seller Dashboard</button>
          <span className="seller-icon">👤</span>
        </div>
        <div className="product-price">
          <h3>Rp. {res.price}</h3>
          <button className="order-now">Order Now</button>
          <button className="add-to-cart">Add To Cart</button>
        </div>
      </div>
      <div className="product-description">
        <h3>Description</h3>
        <p>{res.description}</p>
      </div>
    </div>
    );
};

export default ViewPost