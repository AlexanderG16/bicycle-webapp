import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./index.css";
import Button from "./components/Button";
import "./Home.css";
import "./Header.css";
import cartImage from "./assets/vecteezy_online-shop-icon-set-vector-for-web-presentation-logo_4262773.jpg";
import profileImage from "./assets/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg";
<<<<<<< HEAD

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
=======
import { jwtDecode, JwtPayload } from "jwt-decode"; // Fix import statement

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
>>>>>>> 39935ed1067c52050789f7a153f2a2651d5e1ef9

  useEffect(() => {
    const token = Cookies.get("token");
    if (typeof token === "string") {
<<<<<<< HEAD
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);
=======
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
                  <p class="upload-time">${element.upload_date.slice(0, 10)}</p>
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

    fetchData();
    console.log("is Seller: " + isSeller);
  }, []);
>>>>>>> 39935ed1067c52050789f7a153f2a2651d5e1ef9

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
<<<<<<< HEAD
          </div>
          <p>Join our community of cycling enthusiasts and discover a wide range of bikes to suit every style and need, quality, convenience, and passion all in one place.</p>
          <div className="hero-buttons">
            <Button btnType="browse-listing">Browse Listings</Button>
=======
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
>>>>>>> 39935ed1067c52050789f7a153f2a2651d5e1ef9
            <Button btnType="about-us">About Us</Button>
          </div>
        </div>
      </section>
<<<<<<< HEAD

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
=======
      <div className="search-bar-create-post" id="search-bar">
        <input type="text" placeholder="Search" className="search-bar" />
        {isSeller ? <Button btnType="create-post">Create Post</Button> : <div></div>}
      </div>

      <div id="post-area"></div>
>>>>>>> 39935ed1067c52050789f7a153f2a2651d5e1ef9
    </div>
  );
};

<<<<<<< HEAD
<script>

</script>

=======
>>>>>>> 39935ed1067c52050789f7a153f2a2651d5e1ef9
export default Home;
