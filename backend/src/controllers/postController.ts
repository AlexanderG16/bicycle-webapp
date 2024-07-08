import { Request, Response } from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs";

import { getAllPosts, createPost, getPostByID, getImagesById, searchPosts } from "../models/post";

import { bike_type } from "../models/post";
import path from "path";

// import upload from "../app";

const getImageFromServer = async (req: Request, res: Response) => {
  const filename = req.params.filename;
  const directoryPath = path.resolve(__dirname, "../../user_uploads");
  const filePath = path.join(directoryPath, filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(404).send("File not found");
    }
  });
};

const displayPost = async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();
    if (posts) {
      return res.status(200).json({
        message: "Posts successfully retreived",
        posts: posts,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unexpected Error Occured" });
  }
};

const searchPostByKeyword = async (req: Request, res: Response) => {
  const keyword = req.query.keyword as string;
  if (!keyword) {
    return res.status(400).json({ message: "Keyword is required" });
  }

  try {
    const posts = await searchPosts(keyword);
    if (posts && posts.length > 0) {
      return res.status(200).json({
        message: "Posts successfully retrieved",
        number_of_posts: posts.length,
        posts: posts,
      });
    } else {
      return res.status(404).json({ message: "No posts found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unexpected error occurred" });
  }
};

const makePost = async (req: Request, res: Response) => {
  const images = req.files;
  const { title, bike_type_input, description, price, city, province, upload_date, stock, status, user_id } = req.body;

  console.log(title);
  console.log("Bike Type: ", bike_type_input);
  console.log(description);
  console.log(price);
  console.log(city);
  console.log(province);
  console.log(upload_date);
  console.log(stock);
  console.log(status);
  console.log(images);
  console.log("user id: ", user_id);

  try {
    let enumBikeType: bike_type;
    // console.log(enumBikeType);
    if (bike_type_input === "mountainBike") {
      enumBikeType = bike_type.MOUNTAIN_BIKE;
    } else if (bike_type_input === "bmx") {
      enumBikeType = bike_type.BMX;
    } else if (bike_type_input === "touringBike") {
      enumBikeType = bike_type.TOURING_BIKE;
    } else {
      enumBikeType = bike_type.ROAD_BIKE;
    }

    let arrImages = [""];
    const files = images as Express.Multer.File[];

    for (let i = 0; i < files.length; i++) {
      arrImages[i] = files[i].filename;
    }

    console.log(enumBikeType);

    await createPost(title, enumBikeType, description, price, city, province, upload_date, stock, status, user_id, arrImages);

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Unexpected Error Occured" });
  }
};

const getOnePost = async (req: Request, res: Response) => {
  const getIdFromPath = (path: string) => {
    const pathSegments = path.split("/");
    const idString = pathSegments[pathSegments.length - 1]; // Assuming id is the last segment
    return Number(idString); // Convert the extracted id to a number
  };

  const id = getIdFromPath(req.path);
  // console.log("ID Get One Post: ", id);

  try {
    const post = await getPostByID(+id);
    if (post) {
      return res.status(200).json({
        id: post.id,
        title: post.title,
        bike_type: post.bike_type,
        description: post.description,
        price: post.price,
        city: post.city,
        province: post.province,
        upload_date: post.upload_date,
        stok: post.stok,
        status: post.status,
        user_id: post.user_id,
        url: post.url,
      });
    }
    return res.status(400).json({ message: "Post with that id doesn't exist" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
};

const getPostImages = async (req: Request, res: Response) => {
  const { post_id } = req.body;

  try {
    const images = await getImagesById(+post_id);

    console.log("post images: ", images);

    if (images) {
      return res.status(200).json({
        message: "Posts successfully retreived",
        images: images,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unexpected error occurred" });
  }
};

export { displayPost, makePost, getOnePost, searchPostByKeyword, getImageFromServer, getPostImages };

// const getIdFromPath = (path: string) => {
//   const pathSegments = path.split("/");
//   const idString = pathSegments[pathSegments.length - 2]; // Assuming id is the last segment
//   return Number(idString); // Convert the extracted id to a number
// };

// const userID = req.params.userID;
// console.log("User ID: ", userID);

// const user_id = getIdFromPath(req.path);
