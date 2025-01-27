import Post from "../models/post";
import InitDB from "../database";

export interface Cart {
  id: number;
  posts: Array<Post>;
  updatedAt: Date;
}

export interface CartItems {
  cart_id: number;
  post_id: number;
  post: Post;
  quantity: number;
  addedAt: Date;
  price?: number;
}

export enum CartStatus {
  CHECKED_OUT = "checked out",
  NOT_CHECKED_OUT = "not checked out",
}

export const createCart = async (user_id?: number): Promise<void> => {
  const connection = await InitDB.getInstance();
  try {
    const [rows] = await connection.query("INSERT INTO cart (user_id) VALUES (?) ON DUPLICATE KEY UPDATE user_id=user_id", [user_id]);
  } finally {
    connection.release();
  }
};

export const getCartByUserId = async (user_id?: number): Promise<Cart | null> => {
  const connection = await InitDB.getInstance();
  try {
    const [cart] = await connection.query("SELECT * FROM cart WHERE user_id=?", [user_id]);
    connection.release();
    if (Array.isArray(cart) && cart.length > 0) {
      return cart[0] as Cart;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error finding cart by user_id:", error);
    connection.release();
    return null;
  }
};

export const getAllCartItems = async (cart_id: number): Promise<Array<CartItems> | null> => {
  const conn = await InitDB.getInstance();
  try {
    const [rows] = await conn.query(
      `
      SELECT ci.*, p.*, i.url
      FROM cart_item ci
      JOIN cart c ON ci.cart_id = c.id
      JOIN post p ON ci.post_id = p.id
      JOIN image i ON p.id = i.post_id
      WHERE c.id = ? AND ci.status = ?
      GROUP BY ci.post_id
    `,
      [cart_id, CartStatus.NOT_CHECKED_OUT]
    );

    conn.release();

    return rows as Array<CartItems>;
  } catch (error) {
    console.error("Error getting all cart items:", error);
    conn.release();
    return null;
  }
};

export const insertItemToCart = async (cart_id?: number, post_id?: number, quantity?: number): Promise<void> => {
  const conn = await InitDB.getInstance();
  try {
    await conn.query("INSERT INTO cart_item (cart_id, post_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?", [cart_id, post_id, quantity, quantity]);
    conn.release();
  } catch (error) {
    console.error("Unexpected Error Occured ", error);
    conn.release();
    throw error;
  }
};

export const incrementItem = async (cart_id?: number, post_id?: number): Promise<void> => {
  const conn = await InitDB.getInstance();
  try {
    await conn.query("UPDATE cart_item SET quantity = quantity + 1 WHERE cart_id = ? AND post_id = ?", [cart_id, post_id]);
    conn.release();
  } catch (error) {
    console.error("Unexpected Error Occured ", error);
    conn.release();
    throw error;
  }
};

export const decrementItem = async (cart_id?: number, post_id?: number): Promise<void> => {
  const conn = await InitDB.getInstance();
  try {
    await conn.query("UPDATE cart_item SET quantity = IF(quantity = 1, quantity, quantity - 1) WHERE cart_id = ? AND post_id = ?", [cart_id, post_id]); // TODO: Tambahin message kalau decrement nya udah < 1
    conn.release();
  } catch (error) {
    console.error("Unexpected Error Occured: ", error);
    conn.release();
    throw error;
  }
};

export const setItemQuantity = async (cart_id?: number, post_id?: number, quantity?: number): Promise<void> => {
  const conn = await InitDB.getInstance();
  try {
    await conn.query("UPDATE cart_item SET quantity = ? WHERE cart_id = ? AND post_id = ?", [quantity, cart_id, post_id]);
    conn.release();
  } catch (error) {
    console.error("Unexpected Error Occured: ", error);
    conn.release();
    throw error;
  }
};

export const updateCartItemStatus = async (cart_id?: number): Promise<void> => {
  const conn = await InitDB.getInstance();

  try {
    await conn.query("UPDATE cart_item SET status = ? WHERE cart_id = ?", [CartStatus.CHECKED_OUT, cart_id]);
  } catch (error) {
    console.error("Unexpected Error Occured: ", error);
  } finally {
    conn.release();
  }
};
