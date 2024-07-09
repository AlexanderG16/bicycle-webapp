import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import cartImage from "./assets/vecteezy_online-shop-icon-set-vector-for-web-presentation-logo_4262773.jpg";
import profileImage from "./assets/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg";
import "./OrderPageCart.css";
import Button from "./components/Button";

const OrderPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(-1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart_id, setCartId] = useState(0);
  const [user_id, setUserId] = useState(0);

  useEffect(() => {
    const token = Cookies.get("token");
    const fetchData = async () => {
      try {
        if (typeof token === "string") {
          const decode = jwtDecode(token)
          const cart_id = decode.cart_id;
          setCartId(cart_id??0);
          setUserId(decode.user_id??0);
          const response = await fetch("http://localhost:5000/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cart_id }),
          });
          if (response.ok) {
            const data = await response.clone().json();
            setIsAuthenticated(0);
            var html = "";
            var total_price = 0;

            for (let index = 0; index < data.number_of_posts; index++) {
              const element = data.posts[index];
              html += `
                  <div class="post">
                    <div class="click-post" data-id="${element.id}">
                      <div class="post-img">
                        <img src="http://localhost:5000/user_uploads/retrieve_img/${element.url}"></img>
                      </div>
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
              total_price += element.quantity * element.price;
            }
            setTotalPrice(total_price);

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

              const interactiveElements = container.getElementsByClassName("interactive");
              Array.from(interactiveElements).forEach((interactive, index) => {
                const decreaseBtn = interactive.querySelector(".decrease");
                const increaseBtn = interactive.querySelector(".increase");
                const inputQty = interactive.querySelector('input[type="number"]');
                const saveBtn = interactive.querySelector(".save-settings");

                if (decreaseBtn && increaseBtn && inputQty && saveBtn) {
                  decreaseBtn.addEventListener("click", () => {
                    let qty = parseInt(inputQty.getAttribute("value") as string);
                    if (qty > 1) {
                      qty--;
                      inputQty.setAttribute("value", qty.toString());
                    }
                  });

                  increaseBtn.addEventListener("click", () => {
                    let qty = parseInt(inputQty.getAttribute("value") as string);
                    qty++;
                    inputQty.setAttribute("value", qty.toString());
                  });

                  saveBtn.addEventListener("click", async () => {
                    const quantity = parseInt(inputQty.getAttribute("value") as string);
                    const post_id = saveBtn.getAttribute("data-post-id");
                    try {
                      const response = await fetch("http://localhost:5000/cart/set-qty", {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ cart_id, post_id, quantity }),
                      });

                      if (response.ok) {
                        window.alert("Quantity updated successfully");
                        location = location;
                      } else {
                        window.alert("Failed to update quantity");
                      }
                    } catch (error) {
                      console.error("Error updating quantity: ", error);
                      // Handle fetch or network error
                    }
                  });
                }
              });
            }
          }
        }
      } catch (error) {
        console.error("Error getting all posts: ", error);
        setIsAuthenticated(3);
        throw error;
      }
    };

    fetchData();
  }, [isAuthenticated, totalPrice, cart_id, user_id, totalPrice]);

  const insertIntoTransaction = async () => {
    try {
      const response = await fetch(`http://localhost:5000/transaction/order-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({user_id, cart_id, total_price: totalPrice})
      })
      
      const data = await response.json();
      window.alert(data.message);
      if (response.status === 201) {
        window.location.href = '/transaction-history'
      }
    } catch (error) {
      window.alert(error);
    }
  }

  return (
    <div className="order-cart">
      <main className="main-content-order-cart">
        <section className="hero-order-cart">
          <header className="header-order-cart">
            <div className="header-left-order-cart">
              <button
                className="back-button"
                onClick={function () {
                  window.location.href = "/cart";
                }}
              >
                ❮ BACK
              </button>
            </div>
            <div className="header-right-order-cart">
              <img className="btn-cart-menu" src={cartImage} style={{ cursor: "not-allowed" }}></img>
              <img
                className="btn-profile-menu"
                src={profileImage}
                onClick={function () {
                  location.href = "/profile";
                }}
              ></img>
            </div>
          </header>
          <div className="hero-content-order-cart">
            <div className="slogan-order-cart">
              <h1>FIND YOUR PERFECT BIKE</h1>
              <h1>FIND YOUR PERFECT BIKE</h1>
              <h1>FIND YOUR PERFECT BIKE</h1>
              <h1>FIND YOUR PERFECT BIKE</h1>
            </div>
          </div>
        </section>
        <div className="content-sections-order-cart">
          {isAuthenticated === 0 && (
            <>
              <div className="section-order-cart">
                <h1>Items</h1>
                <div id="post-area"></div>
              </div>
              <div id="right-area">
                <p>CONFIRM YOUR ORDER?</p>
                <hr />
                <div className="total-price">
                  <h2>Rp. {totalPrice}</h2>
                </div>
                <Button btnType="pay-from-cart" onClick={insertIntoTransaction}>Pay</Button>
              </div>
            </>
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

export default OrderPage;
