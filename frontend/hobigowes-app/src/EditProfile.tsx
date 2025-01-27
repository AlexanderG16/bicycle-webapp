import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import "./index.css";
import "./Header.css";
import "./Form.css";
import "./EditProfile.css";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import axios from "axios";

const EditProfile = () => {
  const [userID, setUserID] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
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
      setAddress(data.address);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    console.error("halo");
    if (!userID || !imageFile) {
      setMessage("User ID or profile picture not found");
      return;
    }

    const formData = new FormData();

    formData.append("username", username);
    formData.append("phone_number", phoneNumber);
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("profile_picture", imageFile);
    formData.append("user_id", userID.toString());

    try {
      const response = await axios.put(`http://localhost:5000/profile/edit-profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        window.alert("Profile updated successfully");
        window.location = location;
        setMessage("Profile updated successfully");
      } else {
        window.alert("Failed to update profile");
        setMessage("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      window.alert("Error updating profile");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div className="edit-profile">
      <header className="header">
        {/* <h2 className="logo">HOBIGOWES</h2> */}
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
      </header>
      <section id="edit-profile-section">
        <form id="form-editprofile" className="form-editprofile" onSubmit={handleUpdateProfile} encType="multipart/form-data" method="put">
          <div className="form-put-inputs">
            <label htmlFor="username">Change Username</label>
            <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

            <label htmlFor="email">Change E-Mail</label>
            <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="phoneNumber">Change Phone Number</label>
            <input type="text" id="phoneNumber" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

            <label htmlFor="address">Change Address</label>
            <input type="text" id="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />

            <label htmlFor="oldPassword">Old Password</label>
            <input type="password" id="oldPassword" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />

            <label htmlFor="newPassword">New Password</label>
            <input type="password" id="newPassword" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>

          <div className="form-upload-profile-pic">
            <label htmlFor="image">Change Profile Picture</label>
            <input type="file" className="put-profile-picture" id="image" name="profile_picture" accept="image/*" onChange={handleFileChange} required />
            <Button btnType="edit-profile" type="submit">
              Save
            </Button>
          </div>
        </form>
      </section>
      {message && <p id="status-message">{message}</p>}
    </div>
  );
};

export default EditProfile;
