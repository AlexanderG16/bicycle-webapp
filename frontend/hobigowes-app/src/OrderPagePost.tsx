import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import cartImage from "./assets/vecteezy_online-shop-icon-set-vector-for-web-presentation-logo_4262773.jpg";
import profileImage from "./assets/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg";
import "./OrderPageCart.css";
import Button from "./components/Button";
import { useLoaderData, useNavigate } from "react-router-dom";
import Post from "../../../backend/src/models/post";
import "./OrderPageCart.css";
import { jwtDecode, JwtPayload } from "jwt-decode";

const OrderPagePost: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(-1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [post, setPost] = useState<Post>();
  const [quantity, setQuantity] = useState(1);
  const [user_id, setUserId] = useState(0);

  const postPass = useLoaderData() as Post;
  useEffect(() => {
    const token = Cookies.get("token");
    try {
      setPost(postPass);
      if (typeof token === "string") {
        setIsAuthenticated(0);
        setTotalPrice(postPass.price);
        const decode = jwtDecode<JwtPayload>(token);
        setUserId(decode.user_id ?? 0);
      } else {
        setIsAuthenticated(2);
      }
    } catch (error) {
      console.error("Error getting all posts: ", error);
      setIsAuthenticated(3);
      throw error;
    }
  }, [post, user_id]);

  const handleDecrease = () => {
    setQuantity((prevQty) => Math.max(prevQty - 1, 1));
  };

  const handleIncrease = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  useEffect(() => {
    if (post) {
      setTotalPrice(post.price * quantity);
    }
  }, [quantity, post]);

  const insertIntoTransaction = async () => {
    try {
      const response = await fetch(`http://localhost:5000/transaction/${post?.id}/order-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, quantity }),
      });

      const data = await response.json();
      window.alert(data.message);

      // const navigate = useNavigate();

      // if (response.status === 201) {
      //   navigate("/transaction-history");
      // }
    } catch (error) {
      window.alert(error);
    }
  };

  const formatRupiah = (price: number | undefined): string => {
    if (price === undefined) {
      return "Rp. 0"; // or any default value or message you want to return
    }
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price);
  };

  return (
    <div className="order-cart">
      <main className="main-content-order-cart">
        <section className="hero-order-cart">
          <header className="header-order-cart">
            <div className="header-left-order-cart">
              <button
                className="back-button"
                onClick={() => {
                  window.location.href = `/post/${post?.id}`;
                }}
              >
                ❮ BACK
              </button>
            </div>
            <div className="header-right-order-cart">
              {isAuthenticated === 0 && (
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
              )}
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
                <h1>Item</h1>
                <div id="post-area">
                  <div className="post">
                    <div className="click-post" data-id={`${post?.id}`}>
                      <div className="post-img">
                        <img src={`http://localhost:5000/user_uploads/retrieve_img/${post?.url}`}></img>
                      </div>
                      <div className="post-description">
                        <h3 className="post-title">{post?.title}</h3>
                        <p className="post-loc">
                          {post?.city}, {post?.province}
                        </p>
                        <h2 className="price">{formatRupiah(post?.price)}</h2>
                        <p className="upload-time">{(post?.upload_date as string).slice(0, 10)}</p>
                      </div>
                    </div>
                    <div className="interactive">
                      <div className="qty-settings">
                        <button className="decrease" onClick={handleDecrease}>
                          -
                        </button>
                        <input id="input-qty" type="number" value={quantity} readOnly />
                        <button className="increase" onClick={handleIncrease}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="right-area">
                <p>CONFIRM YOUR ORDER?</p>
                <hr />
                <div className="total-price">
                  <h2>{formatRupiah(totalPrice)}</h2>
                </div>
                <Button btnType="pay-from-cart" onClick={insertIntoTransaction}>
                  Pay
                </Button>
              </div>
            </>
          )}
          {isAuthenticated === 2 && (
            <div className="not-logged-in">
              <h2>Access Denied</h2>
              <p>You need to be logged in to be able to make an order.</p>
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

export default OrderPagePost;
