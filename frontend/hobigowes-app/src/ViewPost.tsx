import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./index.css";
import "./Home.css";
import "./Header.css";
import "./ViewPost.css";
import { useLoaderData } from "react-router-dom";
import Post from "../../../backend/src/models/post";
import cartImage from "./assets/vecteezy_online-shop-icon-set-vector-for-web-presentation-logo_4262773.jpg";
import profileImage from "./assets/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg";
import { jwtDecode, JwtPayload } from "jwt-decode";

const ViewPost = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartId, setCartId] = useState<number>();
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const token = Cookies.get("token");
    if (typeof token === "string") {
      const payload = jwtDecode<JwtPayload>(token);
      setIsAuthenticated(true);
      setToken(token);
      setCartId(payload.cart_id);
    }
  }, [cartId]);

  const post = useLoaderData() as Post;
  console.log(post);

  const post_id = post.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/user_uploads/retrieve_img_post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ post_id }),
        });

        if (response.ok) {
          const data = await response.json();
          const images = data.images.map((image: { url: string }) => image.url);
          setImages(images);
        }
      } catch (error) {
        console.error("Error getting post images: ", error);
        throw error;
      }
    };

    fetchData();
  }, []);

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const orderItem = () => {
    if (token !== null || token !== undefined) {
      window.location.href = `/post/order-checkout/${post_id}`;
    } else {
      // notify user to signin first
    }
  };

  const insertToCart = async () => {
    if (cartId !== undefined) {
      console.log(cartId);
      const response = await fetch("http://localhost:5000/cart/insert-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart_id: cartId, post_id, quantity: "1" }),
      });
      const data = await response.json();

      if (response.status === 201) {
        window.alert(data.message);
        window.location.href = "/cart";
      } else {
        window.alert(data.message);
      }
    } else {
      window.location.href = "/signin";
    }
  };

  return (
    <div className="product-view">
      <header className="header">
        <div className="header-left">
          <h1 className="logo">HOBIGOWES</h1>
        </div>
        <div className="header-right">
          {isAuthenticated ? (
            <>
              <img
                className="btn-cart-menu"
                src={cartImage}
                onClick={() => {
                  location.href = "/cart";
                }}
              />
              <img
                className="btn-profile-menu"
                src={profileImage}
                onClick={() => {
                  location.href = "/profile";
                }}
              />
            </>
          ) : (
            <div className="header-links">
              <a href="/signin" className="sign-in-btn">
                Sign In
              </a>
              <a href="/signup" className="sign-up-btn">
                Sign Up
              </a>
            </div>
          )}
        </div>
      </header>
      <div className="carousel">
        <button className="carousel-button" id="left-button" onClick={handleLeftClick}>
          ❮
        </button>
        <div id="img-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((url, index) => (
            <div key={index} className="carousel-image">
              <img src={`http://localhost:5000/user_uploads/retrieve_img/${url}`} alt="Product Image" />
            </div>
          ))}
        </div>
        <button className="carousel-button" id="right-button" onClick={handleRightClick}>
          ❯
        </button>
      </div>
      <div className="product-details">
        <div className="product-info">
          <div>
            <h2 style={{ color: "black", fontSize: "22px" }}>{post.title}</h2>
            <p className="location" style={{ color: "black", fontSize: "18px" }}>
              <span className="icon">📍</span>
              {post.city}, {post.province}
            </p>
          </div>
          <div>
            <button className="seller-dashboard">View Seller Dashboard</button>
            <span className="seller-icon">👤</span>
          </div>
        </div>
        <div className="product-price">
          <h3>Rp. {post.price}</h3>
          <button className="order-now" onClick={orderItem}>
            Order Now
          </button>
          <button className="add-to-cart" onClick={insertToCart}>
            Add To Cart
          </button>
        </div>
      </div>
      <div className="product-description">
        <h3>Description</h3>
        <p>{post.description}</p>
      </div>
    </div>
  );
};

export default ViewPost;
