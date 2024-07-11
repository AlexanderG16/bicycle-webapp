import React, { FormEvent, useState, useEffect } from "react";
import Button from "./components/Button";
import "./index.css";
import "./Header.css";
import "./Form.css";
import "./CreatePost.css";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import axios from "axios";

const CreatePost = () => {
  const [userID, setUserID] = useState(0);

  const [postTitle, setPostTitle] = useState<string>("");

  const [bikeType, setBikeType] = useState<string>("mountainBike");

  const [postDescription, setPostDescription] = useState<string>("");
  const [postCity, setPostCity] = useState<string>("");
  const [postProvince, setPostProvince] = useState<string>("");
  const [postPrice, setPostPrice] = useState<string>("");

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [postStock, setPostStock] = useState<string>("");

  const [message, setMessage] = useState<string>();

  useEffect(() => {
    const token = Cookies.get("token");
    if (typeof token === "string") {
      // Decode token to get user_id
      const decodedToken = jwtDecode<JwtPayload>(token);

      if (decodedToken.user_id) {
        setUserID(decodedToken.user_id);
      }
    }
  }, [userID]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageFiles.length === 0) {
      setMessage("Please select at least one image to upload");
      return;
    } else {
      console.log("Panjang Images: ", imageFiles.length);
      const formData = new FormData();
      imageFiles.forEach((file) => {
        formData.append(`images`, file);
        console.log("fileName: ", file.name);
      });

      formData.append(`title`, postTitle);
      formData.append(`bike_type_input`, bikeType);
      formData.append(`description`, postDescription);
      formData.append(`price`, postPrice);
      formData.append(`city`, postCity);
      formData.append(`province`, postProvince);
      formData.append(`upload_date`, new Date().toISOString());
      formData.append(`stock`, postStock);
      formData.append(`user_id`, userID.toString());

      if (postStock != "0") {
        formData.append(`status`, "available");
      } else {
        formData.append(`status`, "sold out");
      }

      axios
        .post(`http://localhost:5000/${userID}/create-post`, formData)
        .then((res) => {
          if (res.status == 201) {
            setMessage("File uploaded successfully");
          } else {
            setMessage("File upload failed");
          }
        })
        .catch((error) => {
          // Handle network errors or Axios-specific errors
          console.error("Error during POST request:", error);
        });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      setImageFiles(filesArray);
    }
  };

  const handleChangeBikeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBikeType(event.target.value);
  };

  return (
    <div className="create-post">
      <header className="header">
        <h2 className="logo">HOBIGOWES</h2>
      </header>
      <section id="create-post-section">
        <form id="form-createpost" className="form-createpost" onSubmit={handleUpload} encType="multipart/form-data" method="post">
          <div className="form-upload-image">
            <label htmlFor="image">Select Image:</label>
            <br />
            <input type="file" className="input-for-img" id="images" name="images" accept="image/*" onChange={handleFileChange} required multiple />
            <br />
            <br />
          </div>
          <div className="form-other-post-data">
            <div className="form-post-left">
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" placeholder="Title" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />

              <label htmlFor="bike-type">Bike Type:</label>
              <select id="bike-type" name="bikeType" onChange={handleChangeBikeType}>
                <option value="mountainBike">Mountain Bike</option>
                <option value="bmx">BMX</option>
                <option value="roadBike">Road Bike</option>
                <option value="touringBike">Touring Bike</option>
              </select>

              <label htmlFor="post-description">Description:</label>

              <textarea id="post-description" value={postDescription} rows={4} cols={55} onChange={(e) => setPostDescription(e.target.value)}></textarea>
            </div>
            <div className="form-post-right">
              <label htmlFor="city">City:</label>
              <input type="text" id="city" value={postCity} onChange={(e) => setPostCity(e.target.value)} />

              <label htmlFor="province">Province:</label>
              <input type="text" id="province" value={postProvince} onChange={(e) => setPostProvince(e.target.value)} />

              <label htmlFor="stock">Stock:</label>
              <input type="text" id="stock" value={postStock} onChange={(e) => setPostStock(e.target.value)} />

              <label htmlFor="price">Price:</label>
              <input type="text" id="price" value={postPrice} onChange={(e) => setPostPrice(e.target.value)} />
            </div>
          </div>
          <Button btnType="create-post" type="submit">
            Upload
          </Button>
        </form>

        {message && <p>{message}</p>}
      </section>
    </div>
  );
};

export default CreatePost;

// const response = await fetch("http://localhost:5000/${userID}/create-post", {
//   method: "POST",
//   headers: {
//     "Content-Type": "multipart/form-data>",
//   },
//   body: formData,
// });
