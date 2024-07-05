import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./index.css";
import Button from "./components/Button";
import "./Home.css";
import "./Header.css";
import cartImage from "./assets/vecteezy_online-shop-icon-set-vector-for-web-presentation-logo_4262773.jpg";
import profileImage from "./assets/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (typeof token === "string") {
      setIsAuthenticated(true);
      const payload = jwtDecode(token);
      if (payload.user_role === 1) {
        setIsSeller(true);
      }
    }
  }, [isAuthenticated, isSeller]);

  window.onload = async () => {
    try {
      const response = await fetch("http://localhost:5000/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        var html = "";
        const data = await response.json();
        const posts = data.posts;
        const message = data.message;
        console.log(message);
        for (let index = 0; index < posts.length; index++) {
          const element = posts[index];
          html += `
            <div class="post" data-id="${element.id}">
              <div class="post-img" style="background-image: url(${element.url})"></div>
              <div class="post-description">
                <h3 class="post-title">${element.title}</h3>
                <p class="post-loc">${element.city}, ${element.province}</p>
                <h2 class="price">Rp. ${element.price}</h2>
                <p class="upload-time">${element.upload_date}</p>
              </div>
            </div>
          `;
        }
        let container = document.getElementById("post-area");
        if (container) {
          container.innerHTML = html;

          const postElements = container.getElementsByClassName("post");
          Array.from(postElements).forEach((post) => {
            post.addEventListener("click", () => {
              const postId = post.getAttribute("data-id");
              console.log(postId);
              window.location.href = `/post/${postId}`;
            });
          });
        } else {
          const errorData = await response.json();
          console.error("Error getting posts' data:", errorData);
          return errorData;
        }

        const errorData = await response.json();
        console.error("Error getting posts' data:", errorData);
        return errorData;
      }
    } catch (error) {
      console.error("Error getting all posts: ", error);
      throw error;
    }
  };

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
            <h1>FIND YOUR PERFECT RIDE!</h1>
          </div>
          <p>Join our community of cycling enthusiasts and discover a wide range of bikes to suit every style and need, quality, convenience, and passion all in one place.</p>
          <div className="hero-buttons">
            <Button
              btnType="browse-listing"
              onClick={function () {
                window.location.href = ".search-bar-create-post";
              }}
            >
              Browse Listings
            </Button>
            <Button btnType="about-us">About Us</Button>
          </div>
        </div>
      </section>
      <div className="search-bar-create-post">
        <input type="text" placeholder="Search" className="search-bar" />
        {isSeller ? (
          <>
            <Button btnType="create-post">Create Post</Button>
          </>
        ) : (
          <div className="header-links"></div>
        )}
      </div>

      <div id="post-area"></div>
    </div>
  );
};

export default Home;
