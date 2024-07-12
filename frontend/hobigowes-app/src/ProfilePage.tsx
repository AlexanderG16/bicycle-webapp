import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./index.css";
import "./ProfilePage.css";
import "./Header.css";
import profileImage from "./assets/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg";
import cartImage from "./assets/vecteezy_online-shop-icon-set-vector-for-web-presentation-logo_4262773.jpg";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const ProfilePage = () => {
  const [userID, setUserID] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
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
  }, [userID]);

  useEffect(() => {
    if (userID !== null) {
      fetchUserProfile(userID);
    }
  }, [userID]);

  const fetchUserProfile = async (userID: number) => {
    try {
      const response = await axios.post("http://localhost:5000/profile/dashboard", {
        user_id: userID,
      });
      const data = response.data;
      setUsername(data.username);
      setEmail(data.email);
      setPhoneNumber(data.phone_number);
      setProfilePicture(data.profile_picture);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      document.cookie = "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      window.alert("Logout Successfully");
      window.location.href = "/";
    } catch (error) {
      window.alert("Failed to Log Out");
    }
  };

  return (
    <div className="profile-page">
      <header className="header">
        <div className="header-left">
          <h2 className="logo">HOBIGOWES</h2>
          <button
            className="back-button"
            onClick={function () {
              window.location.href = "/";
            }}
          >
            HOME
          </button>
        </div>
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
      <section className="profile-page-bg">
        <div className="profile-page-content">
          <div className="profile-info">
            <a id="profile-logo">
              <img src={profilePicture ? `http://localhost:5000/user_uploads/retrieve_img/${profilePicture}` : profileImage} alt="Profile Picture" width="100" height="100" />
            </a>
            <h1 id="profile-name">{username}</h1>
            <article id="profile-desc">
              {email} | {phoneNumber}
            </article>
          </div>
        </div>
      </section>
      <section className="profile-section">
        <div className="profile-actions">
          <a href="/edit-profile" className="profile-menu-item">
            <span>Edit Profile</span>
            <span>&gt;</span>
          </a>
          <a href="/transaction-history" className="profile-menu-item">
            <span>View Transaction History</span>
            <span>&gt;</span>
          </a>
          {isSeller ? (
            <a href="/seller-dashboard" className="profile-menu-item">
              <span>Show Seller Dashboard</span>
              <span>&gt;</span>
            </a>
          ) : (
            <a href="/register-as-seller" className="profile-menu-item">
              <span>Register as Seller</span>
              <span>&gt;</span>
            </a>
          )}
          {isAuthenticated ? (
            <>
              <button onClick={handleLogout} style={{ color: "white" }}>
                Log Out
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
