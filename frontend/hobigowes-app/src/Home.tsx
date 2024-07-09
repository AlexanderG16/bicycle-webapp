import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./index.css";
import Button from "./components/Button";
import "./Home.css";
import "./Header.css";
import cartImage from "./assets/vecteezy_online-shop-icon-set-vector-for-web-presentation-logo_4262773.jpg";
import profileImage from "./assets/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg";
import { jwtDecode, JwtPayload } from "jwt-decode"; // Fix import statement

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [keyword, setKeyword] = useState<string>("");
  const [html, setHtml] = useState<string>("");

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
  }, []);

  useEffect(() => {
    fetchData();
  }, [keyword]); // Fetch posts when keyword changes

  useEffect(() => {
    attachEventListeners(); // Attach event listeners whenever html changes
  }, [html]);

  const fetchData = async () => {
    try {
      let url = `http://localhost:5000/`;
      if (keyword) {
        url = `http://localhost:5000/search?keyword=${keyword}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const message = data.message;
      let htmlContent = "";

      if (response.ok) {
        const posts = data.posts;

        for (let index = 0; index < posts.length; index++) {
          const element = posts[index];

          htmlContent += `
            <div class="post" data-id="${element.id}">
              <div class="post-img">
                <img src="http://localhost:5000/user_uploads/retrieve_img/${element.url}"></img>
              </div>
              <div class="post-description">
                <h3 class="post-title">${element.title}</h3>
                <p class="post-loc">${element.city}, ${element.province}</p>
                <h2 class="price">Rp. ${element.price}</h2>
                <p class="upload-time">${element.upload_date.slice(0, 10)}</p>
              </div>
            </div>
          `;
        }
        setHtml(htmlContent);
      } else if (response.status == 404) {
        htmlContent = "";
        setHtml(htmlContent);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      fetchData();
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };

  const attachEventListeners = () => {
    const postElements = document.getElementsByClassName("post");
    Array.from(postElements).forEach((post) => {
      post.addEventListener("click", () => {
        const postId = post.getAttribute("data-id");
        console.log(postId);
        window.location.href = `/post/${postId}`;
      });
    });
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
                onClick={() => {
                  window.location.href = `/cart`;
                }}
              />
              <img
                className="btn-profile-menu"
                src={profileImage}
                onClick={() => {
                  window.location.href = "/profile";
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
              onClick={() => {
                document.getElementById("search-bar")?.scrollIntoView(true);
              }}
            >
              Browse Listings
            </Button>
            <Button
              btnType="about-us"
              onClick={() => {
                window.location.href = "/aboutus";
              }}
            >
              About Us
            </Button>
          </div>
        </div>
      </section>
      <div className="search-bar-create-post" id="search-bar">
        <form onSubmit={handleSearch} className="search">
          <input type="text" placeholder="Search" className="search-bar" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <button type="submit" className="search-btn-home"></button>
        </form>
        {isSeller && <Button btnType="create-post">Create Post</Button>}
      </div>
      <div id="post-area" dangerouslySetInnerHTML={{ __html: html || '<h2 class="no-post-message">No Posts Available</h2>' }}></div>
    </div>
  );
};

export default Home;
