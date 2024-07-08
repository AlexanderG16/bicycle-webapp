import Post from "../models/post";
import InitDB from "../database";

export interface Cart {
  id: number;
  updatedAt: Date;
  user_id: number;
}

export interface CartItems {
  cart_id: number;
  post: Post;
  quantity: number;
  addedAt: Date;
}

export const createCart = async (user_id?: number): Promise<void> => {
  const connection = await InitDB.getInstance();
  try {
    await connection.query(
      "INSERT INTO cart (user_id) VALUES (?)",
      [user_id]
    );
  } finally {
    connection.release();
  }
};

export const getCartyByUserId = async (user_id?: number): Promise<Cart | null> => {
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
}

export const getAllCartItems = async (
  cart_id: number
): Promise<Array<CartItems> | null> => {
  const conn = await InitDB.getInstance();
  try {
    const [rows] = await conn.query(
      `
      SELECT ci.*, p.*
      FROM cart_item ci
      JOIN cart c ON ci.cart_id = c.id
      JOIN post p ON ci.post_id = p.id
      WHERE c.id = ?
    `,
      [cart_id]
    );

    conn.release();

    return rows as Array<CartItems>;
  } catch (error) {
    console.error("Error getting all cart items:", error);
    conn.release();
    return null;
  }
};

export const insertItemToCart = async (
  cart_id?: number,
  post_id?: number,
  quantity?: number
): Promise<void> => {
  const conn = await InitDB.getInstance();
  try {
    await conn.query(
      "INSERT INTO cart_item (cart_id, post_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?",
      [cart_id, post_id, quantity, quantity]
    );
    conn.release();
  } catch (error) {
    console.error("Unexpected Error Occured ", error);
    conn.release();
    throw error;
  }
};

// export const incrementItem = async (
//   cart_id?: number,
//   post_id?: number
// ): Promise<void> => {
//   const conn = await InitDB.getInstance();
//   try {
//     await conn.query(
//       "UPDATE cart_item SET quantity = quantity + 1 WHERE cart_id = ? AND post_id = ?",
//       [cart_id, post_id]
//     );
//     conn.release();
//   } catch (error) {
//     console.error("Unexpected Error Occured ", error);
//     conn.release();
//     throw error;
//   }
// };

// export const decrementItem = async (
//   cart_id?: number,
//   post_id?: number
// ): Promise<void> => {
//   const conn = await InitDB.getInstance();
//   try {
//     await conn.query(
//       "UPDATE cart_item SET quantity = IF(quantity = 1, quantity, quantity - 1) WHERE cart_id = ? AND post_id = ?",
//       [cart_id, post_id]
//     ); // TODO: Tambahin message kalau decrement nya udah < 1
//     conn.release();
//   } catch (error) {
//     console.error("Unexpected Error Occured: ", error);
//     conn.release();
//     throw error;
//   }
// };

export const setItemQuantity = async (
  cart_id?: number,
  post_id?: number,
  quantity?: number
): Promise<void> => {
  const conn = await InitDB.getInstance();
  try {
    await conn.query(
      "UPDATE cart_item SET quantity = ? WHERE cart_id = ? AND post_id = ?",
      [quantity, cart_id, post_id]
    );
    conn.release();
  } catch (error) {
    console.error("Unexpected Error Occured: ", error);
    conn.release();
    throw error;
  }
};
