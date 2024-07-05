import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./index.css";
import Button from "./components/Button";
import "./ProfilePage.css";
import "./Header.css";
import { jwtDecode } from "jwt-decode";
import profileImage from "./assets/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg";
import cartImage from "./assets/vecteezy_online-shop-icon-set-vector-for-web-presentation-logo_4262773.jpg";

const ProfilePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phoneNumber: ""
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (typeof token === "string") {
      setIsAuthenticated(true);
      const payload = jwtDecode(token);
      if (payload.user_id === 1) {
        setIsSeller(true);
      }
    }
  }, [isAuthenticated, isSeller]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://localhost:5000/profile/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProfileData({
            username: data.username,
            email: data.email,
            phoneNumber: data.phone_number
          });
        } else {
          const errorData = await response.json();
          console.error("Error fetching profile data:", errorData);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (isAuthenticated) {
      fetchProfileData();
    }
  }, [isAuthenticated]);

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
                onClick={() => {
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
      <div className="profile-container">
        <div className="profile-header">
          <img src={profileImage} alt="Profile" className="profile-image" />
          <div className="profile-info">
            <h1>{profileData.username}</h1>
            <p>{profileData.email} | {profileData.phoneNumber}</p>
          </div>
        </div>
        <div className="profile-actions">
          <Button btnType="edit-profile">Edit Profile</Button>
          <Button btnType="view-transaction-history">View Transaction History</Button>
          {isSeller && <Button btnType="show-seller-dashboard">Show Seller Dashboard</Button>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;