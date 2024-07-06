import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import "./index.css";
import "./Header.css";
import "./Form.css";
import "./TransactionHistory.css";
import Cookies from "js-cookie";
import profileImage from "./assets/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg";
import cartImage from "./assets/vecteezy_online-shop-icon-set-vector-for-web-presentation-logo_4262773.jpg";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const TransactionHistory = () => {
  const [userID, setUserID] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [listTransactionsHistory, setListTransactionsHistory] = useState<any[]>(
    []
  );
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
    if (userID !== null) {
      fetchUserTransactionHistory(userID);
    }
  }, [userID]);

  const formatDate = (timestamp: number | Date): string => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const fetchUserTransactionHistory = async (userID: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/transaction/order-list`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const data = response.data;
      setListTransactionsHistory(data);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };

  return (
    <div className="transaction-history">
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
      <section className="trans-history-page-top">
        <div className="trans-history-page-top-content">
          <div className="trans-history-page-top-slogan">
            <h1>FIND YOUR PERFECT BIKE</h1>
            <h1>FIND YOUR PERFECT BIKE</h1>
            <h1>FIND YOUR PERFECT BIKE</h1>
            <h1>FIND YOUR PERFECT BIKE</h1>
          </div>
        </div>
      </section>
      <section className="trans-history-section">
        <div className="trans-history-section-header">
          <h1>Transactions History</h1>
        </div>
        <table className="trans-history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {listTransactionsHistory.length > 0 ? (
              listTransactionsHistory.map((transaction) => (
                <tr key={transaction.transaction_id}>
                  <td>{formatDate(transaction.transaction_date)}</td>
                  <td>{transaction.product_name}</td>
                  <td>{transaction.total_price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default TransactionHistory;
