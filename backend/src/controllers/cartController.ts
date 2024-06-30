import { Request, Response } from "express";

import {decrementItem, getAllCartItems, incrementItem, insertItemToCart, setItemQuantity} from '../models/cart';
import Cookies from "js-cookie";

const getIdFromPath = (path: string, idIndex: number) => {
    const pathSegments = path.split("/");
    const idString = pathSegments[pathSegments.length - idIndex]; // Assuming id is the last segment
    return Number(idString); // Convert the extracted id to a number
};

const verifyUserAccount = (req: Request) => {
    // const token = Cookies.get("token");
    const token = req.headers.authorization?.split(' ')[1];
    if (!token){ return false; }
    return true;
}

export const displayCartItems = async (req: Request, res: Response) => {
    try {
        if (verifyUserAccount(req)){
            const id = getIdFromPath(req.path, 1);
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
        } else {
            return res.status(401).json({ message: "Authorization token is required" })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Unexpected error occurred" });
    }
};

export const insertCartItem = async (req: Request, res: Response) => {
    try {
        if (verifyUserAccount(req)){
            const id = getIdFromPath(req.path, 2);
            const {post_id, quantity} = req.body;
            await insertItemToCart(id, post_id, quantity);
            return res.status(201).json({ message: "Post has been added to cart!" });
        } else {
            return res.status(401).json({ message: "Authorization token is required" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Unexpected Error Occurred" });
    }
}

export const incrementItemQty = async (req: Request, res: Response) => {
    try {
        if (verifyUserAccount(req)) {
            const id = getIdFromPath(req.path, 2);
            const post_id = req.body;
            await incrementItem(id, post_id);
            return res.status(201).json({ message: "Successfully increased post's quantity" })
        } else {
            return res.status(401).json({ message: "Authorization token is required" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unexpected Error Occurred" });
    }
}
export const decrementItemQty = async (req: Request, res: Response) => {
    try {
        if (verifyUserAccount(req)){
            const id = getIdFromPath(req.path, 2);
            const post_id = req.body;
            await decrementItem(id, post_id);
            res.status(201).json({ message: "Successfully decreased post's quantity" })
        } else {
            return res.status(401).json({ message: "Authorization token is required" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unexpected Error Occurred" });
    }
}

export const setItemQty = async (req: Request, res: Response) => {
    try {
        if (verifyUserAccount(req)){
            const id = getIdFromPath(req.path, 2);
            const {post_id, quantity} = req.body;
            await setItemQuantity(id, post_id, quantity);
            res.status(201).json({ message: "Item quantity successfully updated" })
        } else {
            return res.status(401).json({ message: "Authorization token is required" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unexpected Error Occured" });
    }
}