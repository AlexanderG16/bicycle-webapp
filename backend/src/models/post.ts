import InitDB from "../database";

export enum bike_type {
  MOUNTAIN_BIKE = "mountain bike",
  ROAD_BIKE = "road bike",
  TOURING_BIKE = "touring bike",
  BMX = "bmx",
}

enum status {
  AVAILABLE = "available",
  SOLD_OUT = "sold out",
}

interface Post {
  id: number;
  title: string;
  bike_type: bike_type;
  description: string;
  price: number;
  city: string;
  province: string;
  upload_date: string | Date;
  stok: number;
  status: status;
  user_id: number;
  url?: string;
}

export const getAllPosts = async (): Promise<Array<Post> | null> => {
  const conn = await InitDB.getInstance();
  // const posts = Array<Post>;
  try {
    const [rows] = await conn.query("SELECT post.*, image.url FROM post JOIN image ON post.id = image.post_id");
    conn.release();

    console.log("Ieu data all posts: ", rows);

    return rows as Array<Post>;
  } catch (error) {
    console.error("Error getting all posts");
    conn.release();
    return null;
  }
};

export const searchPosts = async (keyword: string): Promise<Array<Post> | null> => {
  const conn = await InitDB.getInstance();
  try {
    const query = `
            SELECT post.*, image.url FROM post JOIN image
            ON post.id = image.post_id WHERE title LIKE ? OR description LIKE ? OR city LIKE ? OR province LIKE ?
        `;
    const [rows] = await conn.query(query, [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`]);

    console.log(rows.url);
    conn.release();
    return rows as Array<Post>;
  } catch (error) {
    console.error("Error searching posts", error);
    conn.release();
    return null;
  }
};

export const createPost = async (
  title: string,
  enum_bike_type: bike_type,
  description: string,
  price: number,
  city: string,
  province: string,
  upload_date: string,
  stok: number,
  status: status,
  user_id: number,
  images: string[]
): Promise<void> => {
  const conn = await InitDB.getInstance();
  try {
    console.log(images);
    console.log(enum_bike_type);
    await conn.query("INSERT INTO post (title, bike_type, description, price, city, province, upload_date, stok, status, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
      title,
      enum_bike_type,
      description,
      price,
      city,
      province,
      upload_date,
      stok,
      status,
      user_id,
    ]);

    const [post_id] = (await conn.query("SELECT LAST_INSERT_ID()")) as any;

    const post_id_num = post_id[0]["LAST_INSERT_ID()"];

    console.log("post id bos: ", post_id_num);

    for (let i = 0; i < images.length; i++) {
      await conn.query("INSERT INTO image (url, post_id) VALUES (?, ?)", [images[0], post_id_num]);
    }

    conn.release();
  } catch (error) {
    console.error("Unexpected Error Occured");
    conn.release();
    throw error;
  }
};

export const getPostByID = async (id?: number): Promise<Post | null> => {
  const conn = await InitDB.getInstance();
  try {
    const [rows] = await conn.query("SELECT post.*, image.url FROM post JOIN image ON post.id = image.post_id WHERE post.id = ?", [id]);
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
};

export const getImagesById = async (post_id: number): Promise<Array<File> | null> => {
  const conn = await InitDB.getInstance();

  try {
    const [images] = await conn.query("SELECT url FROM image WHERE image.post_id = ?", [post_id]);
    conn.release();

    console.log("post_id: ", post_id);
    console.log("images right from query: ", images);

    if (Array.isArray(images) && images.length > 0) {
      return images;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving images", error);
    conn.release();
    return null;
  }
  return null;
};

export default Post;
