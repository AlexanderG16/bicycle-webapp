import React, { FormEvent, useState, useEffect } from "react";
import Button from "./components/Button";
import "./index.css";
import "./Header.css";
import "./Form.css";
import "./CreatePost.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
  id: number;
  username: string;
  role: number;
  iat: number;
  exp: number;
}

const CreatePost = () => {
  const [userID, setUserID] = useState(0);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    const token = Cookies.get("token");
    if (typeof token === "string") {
      // decode token to get user_id
      const decodedToken = jwtDecode<CustomJwtPayload>(token);
      setUserID(decodedToken.id);
    }
  }, [userID]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(imageFiles[0]);

    if (!imageFiles) {
      setMessage("Please filled out the required field");
      return;
    }

    const formData = new FormData();
    formData.append("images", imageFiles[0]);

    console.log(formData);

    // console.log("Form Data: ", formData.entries().next().value);
    // imageFiles.forEach((file, index) => {
    //   formData.append(`images${index}`, file);
    // });

    try {
      const response = await fetch("http://localhost:5000/${userID}/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data>",
        },
        body: formData,
      });

      if (response.ok) {
        setMessage("File uploaded successfully");
      } else {
        setMessage("File upload failed");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("Error uploading file");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      setImageFiles(filesArray);
    }
  };

  return (
    <div className="create-post">
      <header className="header">
        <h2 className="logo">HOBIGOWES</h2>
        <div className="header-menu">
          <img
            className="btn-cart-menu"
            src={""}
            onClick={function () {
              location.href = "/cart";
            }}
          ></img>
          <img
            className="btn-profile-menu"
            src={""}
            onClick={function () {
              location.href = "/profile";
            }}
          ></img>
        </div>
      </header>
      <section>
        <form onSubmit={handleUpload} encType="multipart/form-data">
          <label htmlFor="image">Select Image:</label>
          <br />
          <input type="file" className="input-for-img" id="image" name="images" accept="image/*" onChange={handleFileChange} required />
          <br />
          <br />

          <Button btnType="create-post">Upload</Button>
        </form>

        {message && <p>{message}</p>}
      </section>
    </div>
  );
};

export default CreatePost;
