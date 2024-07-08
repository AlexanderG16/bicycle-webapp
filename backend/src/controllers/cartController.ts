import { Request, Response } from "express";

import {getAllCartItems, insertItemToCart, setItemQuantity} from '../models/cart';


export const displayCartItems = async (req: Request, res: Response) => {
    try {
        const {cart_id} = req.body;
        const posts = await getAllCartItems(cart_id);
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

export const insertCartItem = async (req: Request, res: Response) => {
    try {
        const {cart_id, post_id, quantity} = req.body;
        await insertItemToCart(cart_id, post_id, quantity);
        return res.status(201).json({ message: "Post has been added to cart!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Unexpected Error Occurred" });
    }
}

export const setItemQty = async (req: Request, res: Response) => {
    try {
        const {cart_id, post_id, quantity} = req.body;
        await setItemQuantity(cart_id, post_id, quantity);
        return res.status(201).json({ message: "Item quantity successfully updated" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Unexpected Error Occured" });
    }
}