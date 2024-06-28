import pool from "../db";
export enum BikeType {
    MOUNTAIN_BIKE = 'mountain bike',
    ROAD_BIKE = 'road bike',
    TOURING_BIKE = 'touring bike',
    BMX = 'bmx'
}

export enum Status {
    AVAILABLE = 'available',
    SOLD_OUT = 'sold out'
}

export interface Post {
    id?: number;
    title: string;
    bike_type?: BikeType;
    description?: string;
    price?: number;
    city?: string;
    province?: string;
    upload_date: Date;
    stok?: number;
    status?: Status;
    user_id?: number;
}

export const getAllPosts = async (): Promise<Array<Post> | null> => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query("SELECT * FROM post");
        conn.release();

        return rows as Array<Post>
    } catch (error) {
        console.error("Error getting all posts");
        conn.release();
        return null;
    }
}

export const createPost = async (title: string, bike_type: BikeType, description: string, price: number, city: string, province: string, stok: number, status: Status, user_id: number): Promise<void> => {
    const conn = await pool.getConnection();
    try {
        await conn.query("INSERT INTO post (title, bike_type, description, price, city, province, upload_date, stok, status, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [title, bike_type, description, price, city, province, stok, status, user_id]);
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

export const searchPosts = async (keyword: string): Promise<Array<Post> | null> => {
    const conn = await pool.getConnection();
    try {
        const query = `
            SELECT * FROM post
            WHERE title LIKE ? OR description LIKE ? OR city LIKE ? OR province LIKE ?
        `;
        const [rows] = await conn.query(query, [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`]);
        conn.release();
        return rows as Array<Post>;
    } catch (error) {
        console.error("Error searching posts", error);
        conn.release();
        return null;
    }
}

export default Post;