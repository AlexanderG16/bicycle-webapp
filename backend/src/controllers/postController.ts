import { Request, Response } from "express";

import { getAllPosts, createPost, getPostByID, searchPosts } from "../models/post";

const displayPost = async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();
    if (posts) {
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
  const {
    title,
    bike_type,
    description,
    price,
    city,
    province,
    upload_date,
    stok,
    status,
  } = req.body;
  const getIdFromPath = (path: string) => {
    const pathSegments = path.split("/");
    const idString = pathSegments[pathSegments.length - 2]; // Assuming id is the last segment
    return Number(idString); // Convert the extracted id to a number
  };

  const user_id = getIdFromPath(req.path);
  try {
    await createPost(
      title,
      bike_type,
      description,
      price,
      city,
      province,
      upload_date,
      stok,
      status,
      user_id
    );
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

  try {
    const post = await getPostByID(+id);
    if (post) {
      res.status(200).json({
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
      });
    }
    res.status(400).json({ message: "Post with that id doesn't exist" });
  } catch (error) {
    console.error(error);
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

export { displayPost, makePost, getOnePost, searchPostByKeyword };