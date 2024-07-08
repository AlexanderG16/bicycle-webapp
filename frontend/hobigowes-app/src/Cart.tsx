import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import React, { useEffect, useState } from "react";
import cartImage from "./assets/vecteezy_online-shop-icon-set-vector-for-web-presentation-logo_4262773.jpg";
import profileImage from "./assets/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg";
import "./Cart.css";
import Button from "./components/Button";

const Cart: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(-1);
    useEffect(() => {
      const token = Cookies.get("token");
      const fetchData = async () => {
        try {
          if (typeof(token) === "string") {
            const cart_id = jwtDecode(token).cart_id;
            const response = await fetch("http://localhost:5000/cart", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ cart_id })
            });
            if (response.ok){
              const data = await response.clone().json();
              if (data.number_of_posts === 0) {
                setIsAuthenticated(1);
              } else {
                setIsAuthenticated(0);
              }
              var html = "";
              
              for (let index = 0; index < data.number_of_posts; index++) {
                const element = data.posts[index];
                html += `
                  <div class="post">
                    <div class="click-post" data-id="${element.id}">
                      <div class="post-img" style="background-image: url(${element.url})"></div>
                      <div class="post-description">
                        <h3 class="post-title">${element.title}</h3>
                        <p class="post-loc">${element.city}, ${element.province}</p>
                        <h2 class="price">Rp. ${element.price}</h2>
                        <p class="upload-time">${(element.upload_date as string).slice(0, 10)}</p>
                      </div>
                    </div>
                    <div class='interactive'>
                      <div class='qty-settings'>
                        <button class='decrease'>-</button>
                        <input id='input-qty' type='number' value='${element.quantity}' disabled/>
                        <button class='increase'>+</button>
                      </div>
                      <button class='save-settings' data-post-id='${element.id}'>Save</button>
                    </div>
                  </div>
                `;
              }
              const container = document.getElementById("post-area");
              if (container) {
                container.innerHTML = html;
                const postElements = container.getElementsByClassName("click-post");
                Array.from(postElements).forEach((post) => {
                  post.addEventListener("click", () => {
                    const postId = post.getAttribute("data-id");
                    window.location.href = `/post/${postId}`;
                  });
                });

                const interactiveElements = container.getElementsByClassName('interactive');
                Array.from(interactiveElements).forEach((interactive, index) => {
                    const decreaseBtn = interactive.querySelector('.decrease');
                    const increaseBtn = interactive.querySelector('.increase');
                    const inputQty = interactive.querySelector('input[type="number"]');
                    const saveBtn = interactive.querySelector('.save-settings')

                    if (decreaseBtn && increaseBtn && inputQty && saveBtn) {
                        decreaseBtn.addEventListener("click", () => {
                            let qty = parseInt(inputQty.getAttribute('value') as string);
                            if (qty > 1) {
                                qty--;
                                inputQty.setAttribute('value', qty.toString());
                            }
                        });

                        increaseBtn.addEventListener("click", () => {
                            let qty = parseInt(inputQty.getAttribute('value') as string);
                            qty++;
                            inputQty.setAttribute('value', qty.toString());
                        });

                        saveBtn.addEventListener("click", async () => {
                            const quantity = parseInt(inputQty.getAttribute('value') as string);
                            const post_id = saveBtn.getAttribute('data-post-id');
                            try {
                              const response = await fetch("http://localhost:5000/cart/set-qty", {
                                method: "PUT",
                                headers: {
                                  "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ cart_id, post_id, quantity})
                              });

                              if (response.ok) {
                                window.alert("Quantity updated successfully");
                              } else {
                                window.alert("Failed to update quantity");
                              }

                            } catch (error) {
                              console.error("Error updating quantity: ", error);
                              // Handle fetch or network error
                            }
                          }
                        )
                    }
                });
              }
            }
          } else {
            setIsAuthenticated(2);
          }
        } catch (error) {
          console.error("Error getting all posts: ", error);
          setIsAuthenticated(3);
          throw error;
        };
      };

      fetchData();
    }, [isAuthenticated]);

    return (
      <div className="cart">
        <main className="main-content-cart">
          <section className="hero-cart">
            <header className="header-cart">
            <div className="header-left-cart">
                <button
                className="back-button"
                onClick={function () {
                    window.location.href = "/";
                }}
                >
                ❮ HOME
                </button>
            </div>
            <div className="header-right-cart">
              <img
                className="btn-cart-menu"
                src={cartImage}
                style={{ cursor: "not-allowed" }}
              ></img>
              <img
                className="btn-profile-menu"
                src={profileImage}
                onClick={function () {
                    location.href = "/profile";
                }}
              ></img>
            </div>
            </header>
            <div className="hero-content-cart">
                <div className="slogan-cart">
                <h1>GET READY TO REACH THOUSANDS OF BUYER</h1>
                <h1>GET READY TO REACH THOUSANDS OF BUYER</h1>
                <h1>GET READY TO REACH THOUSANDS OF BUYER</h1>
                <h1>GET READY TO REACH THOUSANDS OF BUYER</h1>
                </div>
            </div>
          </section>
          <div className="content-sections-cart">
          {isAuthenticated === 0 && (
            <>
              <div className="section-cart">
                <h1>My Cart</h1>
                <div id="post-area"></div>
              </div>
              <Button btnType="order-from-cart" onClick={function () {window.location.href='/cart/order'}}>Order Now</Button>
            </>
            )}
            {isAuthenticated === 1 && (
              <div className="no-posts-found">
                <h2>No Posts Found</h2>
                <p>There are no posts in your cart. Start adding some items!</p>
              </div>
            )}
            {isAuthenticated === 2 && (
              <div className="not-logged-in">
                <h2>Access Denied</h2>
                <p>You need to be logged in to view your cart.</p>
              </div>
            )}
            {isAuthenticated === 3 && (
              <div className="error-occurred">
                <h2>Unexpected Error</h2>
                <p>An unexpected error occurred. Please try again later.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  };

export default Cart;