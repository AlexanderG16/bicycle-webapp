import { Request, Response } from "express";

import {getAllCartItems} from '../models/cart';

export const displayCartItems = async (req: Request, res: Response) => {
    try {
        const getIdFromPath = (path: string) => {
            const pathSegments = path.split("/");
            const idString = pathSegments[pathSegments.length - 1]; // Assuming id is the last segment
            return Number(idString); // Convert the extracted id to a number
        };
        const id = getIdFromPath(req.path);
        const posts = await getAllCartItems(id);
        if (posts) {
            return res.status(200).json({
            message: "Items successfully retrieved",
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