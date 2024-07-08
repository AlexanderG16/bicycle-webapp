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
  const [imageFile, setImageFile] = useState<File>();

  const [keyword, setKeyword] = useState<string>();
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
  }, [isAuthenticated, isSeller]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          var htmlContent = "";
          const data = await response.clone().json();
          const posts = data.posts;
          const message = data.message;
          console.log(message);

          console.log("POST IMG URL: ", posts[2].url);

          for (let index = 0; index < posts.length; index++) {
            const element = posts[index];

            htmlContent += `
              <div class="post" data-id="${element.id}">
                <div class="post-img">
                <img src="http://localhost:5000/user_uploads/retrieve_img/${element.url}"></img></div>
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
        }
      } catch (error) {
        console.error("Error getting all posts: ", error);
        throw error;
      }
    };

    fetchData();
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("HANDLE SEARCH");

    if (keyword !== "") {
      try {
        const response = await fetch(`http://localhost:5000/search?keyword=${keyword}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          var htmlContent = "";
          const data = await response.clone().json();
          const posts = data.posts;
          const message = data.message;
          console.log(message);

          for (let index = 0; index < posts.length; index++) {
            const element = posts[index];

            console.log("FOTO VW: ", element.url);

            htmlContent += `
              <div class="post" data-id="${element.id}">
                <div class="post-img">
                <img src="http://localhost:5000/user_uploads/retrieve_img/${element.url}"></img></div>
                <div class="post-description">
                  <h3 class="post-title">${element.title}</h3>
                  <p class="post-loc">${element.city}, ${element.province}</p>
                  <h2 class="price">Rp. ${element.price}</h2>
                  <p class="upload-time">${element.upload_date.slice(0, 10)}</p>
                </div>
              </div>
            `;

            console.log(htmlContent);
          }

          setHtml(htmlContent);

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
        }
      } catch (error) {
        console.error("Error searching post", error);
      }
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
                  window.location.href = `/cart`;
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
                document.getElementById("search-bar")?.scrollIntoView(true);
              }}
            >
              Browse Listings
            </Button>
            <Button
              btnType="about-us"
              onClick={function () {
                window.location.href = "/aboutus";
              }}
            >
              About Us
            </Button>
          </div>
        </div>
      </section>
      <div className="search-bar-create-post" id="search-bar">
        <form className="search" onSubmit={handleSearch}>
          <input type="text" placeholder="Search" className="search-bar" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <button type="submit" className="search-btn-home"></button>
        </form>

        {isSeller ? <Button btnType="create-post">Create Post</Button> : <div></div>}
      </div>
      <div id="post-area"></div>

      <img src="D:/TugasReactJS/RPLL/bicycle-webapp/backend/user_uploads/1720237419063-Deluxe MTB.jpg" alt="" />
    </div>
  );
};

export default Home;
