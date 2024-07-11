import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import "./index.css";
import "./Header.css";
import "./SellerDashboard.css";
import Cookies from "js-cookie";
import profileImage from "./assets/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg";
import cartImage from "./assets/vecteezy_online-shop-icon-set-vector-for-web-presentation-logo_4262773.jpg";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const SellerDashboard = () => {
  const [userID, setUserID] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [listBestSellingPosts, setBestSellingPosts] = useState<any[]>([]);
  const [totalSales, setTotalSales] = useState<number | null>(null);
  const [totalOrder, setTotalOrder] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (typeof token === "string") {
      setIsAuthenticated(true);
      const payload: { role?: number; user_id?: number } = jwtDecode(token);
      if (payload.role === 1) {
        setIsSeller(true);
      }
      if (payload.user_id) {
        setUserID(payload.user_id);
      }
    }
  }, []);

  useEffect(() => {
    if (isSeller && userID !== null) {
      fetchUserProfile(userID);
      fetchListBestSellingPosts(userID);
      fetchTotalSales(userID);
      fetchTotalOrder(userID);
    }
  }, [userID, isSeller]);

  const fetchUserProfile = async (userID: number) => {
    try {
      const response = await axios.post("http://localhost:5000/profile/dashboard", {
        user_id: userID,
      });

      const data = response.data;
      setUsername(data.username);
      setProfilePicture(data.profile_picture);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchListBestSellingPosts = async (userID: number) => {
    try {
      const response = await axios.post("http://localhost:5000/transaction/seller-orders-list", {
        user_id: userID,
      });

      const data = response.data;
      setBestSellingPosts(data);
    } catch (error) {
      console.error("Error fetching best selling posts:", error);
    }
  };

  const fetchTotalSales = async (userID: number) => {
    try {
      const response = await axios.post("http://localhost:5000/transaction/total-sales", {
        user_id: userID,
      });

      const data = response.data;
      setTotalSales(data.total_sales);
    } catch (error) {
      console.error("Error fetching total sales:", error);
    }
  };

  const fetchTotalOrder = async (userID: number) => {
    try {
      const response = await axios.post("http://localhost:5000/transaction/total-transactions", {
        user_id: userID,
      });

      const data = response.data;
      setTotalOrder(data.total_orders);
    } catch (error) {
      console.error("Error fetching total orders:", error);
    }
  };

  return (
    <div className="profile-page">
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
                onClick={() => {
                  location.href = "/profile";
                }}
              ></img>
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
      <section className="seller-page-bg"></section>
      <section id="seller-section">
        <div className="seller-section-header">
          <a id="seller-profile-logo">
            <img src={profilePicture ? `http://localhost:5000/user_uploads/retrieve_img/${profilePicture}` : profileImage} alt="Profile Picture" width="250px" height="250px" />
          </a>
          <div className="seller-profile-info">
            <h1 id="seller-profile-name">{username}</h1>
            <Button btnType="edit-profile" type="submit">
              Contact Seller
            </Button>
          </div>
          <div className="seller-total-sales">
            <h2 id="seller-total-sales-header2">Total Sales</h2>
            <a>Rp. {totalSales}, 00</a>
          </div>
          <div className="seller-total-order">
            <h2 id="seller-total-order-header2">Total Order</h2>
            <a>{totalOrder} Pcs</a>
          </div>
        </div>
      </section>
      <section className="seller-products-section">
        <h1 id="seller-products-section-header">Best Selling Products</h1>
        <table className="seller-best-products-table">
          <thead id="seller-best-products-thead">
            <tr id="seller-best-products-row">
              <th id="seller-best-products-th">Product Name</th>
              <th id="seller-best-products-th">Price</th>
              <th id="seller-best-products-th">Sold</th>
            </tr>
          </thead>
          <tbody id="seller-best-products-tbody">
            {listBestSellingPosts.length > 0 ? (
              listBestSellingPosts.map((post) => (
                <tr id="seller-best-products-tr" key={post.transaction_id}>
                  <td id="seller-best-products-td">{post.product_name}</td>
                  <td id="seller-best-products-td">Rp. {post.product_price}, 00</td>
                  <td id="seller-best-products-td">{post.quantity} Pcs</td>
                </tr>
              ))
            ) : (
              <tr>
                <td id="seller-best-products-td" colSpan={3}>
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default SellerDashboard;
