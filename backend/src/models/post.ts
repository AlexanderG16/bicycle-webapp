import pool from "../db";
enum bike_type {
    'mountain bike',
    'road bike',
    'touring bike',
    'bmx'
}

enum status {
    'available',
    'sold out'
}

interface Post {
    id?: number;
    title: string;
    bike_type?: bike_type;
    description?: string;
    price?: number;
    city?: string;
    province?: string;
    upload_date: string; // Rancu, harus ngecek returnnya dalam bentuk apa
    stok?: number;
    status?: status;
    user_id?: number;
}

export const getAllPosts = async (): Promise<Array<Post> | null> => {
    const conn = await pool.getConnection();
    // const posts = Array<Post>;
    try {
        const [rows] = await conn.query("SELECT * FROM post");
        conn.release();

        return rows as Array<Post> // Harus di cek lagi bener apa engga
    } catch (error) {
        console.error("Error getting all posts");
        conn.release();
        return null;
    }
}

export const createPost = async (title: string, bike_type: bike_type, description: string, price: number, city: string, province: string, upload_date: string, stok: number, status: status, user_id: number): Promise<void> => {
    const conn = await pool.getConnection();
    try {
        await conn.query("INSERT INTO post (title, bike_type, description, price, city, province, upload_date, stok, status, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [title, bike_type, description, price, city, province, upload_date, stok, status, user_id]);
        conn.release();
    } catch (error) {
        console.error("Unexpected Error Occured");
        conn.release();
        throw error;
    }
}

export const getPostByID = async (id?: number): Promise<Post | null> => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query("SELECT * FROM post WHERE id = ?", [id]);
        conn.release();

        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0] as Post;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error finding post by id:", error);
        conn.release();
        return null;
    }
}