import {
  createPool,
  Pool,
  PoolConnection,
  FieldPacket,
  OkPacket,
  ResultSetHeader,
} from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

class InitDB {
  private static instance: InitDB;
  private static pool: Pool;
  private connection: PoolConnection;

  private constructor(connection: PoolConnection) {
    this.connection = connection;
  }

  public static async getInstance(): Promise<InitDB> {
    if (!InitDB.pool) {
      InitDB.pool = createPool({
        host: DB_HOST || "localhost",
        user: DB_USER || "root",
        password: DB_PASSWORD || "",
        database: DB_NAME || "hobigowes",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
    }

    const connection = await InitDB.pool.getConnection();
    return new InitDB(connection);
  }

  public async query(
    query: string,
    values?: any[]
  ): Promise<[any, FieldPacket[] | OkPacket[] | ResultSetHeader[]]> {
    return this.connection.execute(query, values);
  }

  public release(): void {
    this.connection.release();
  }

  public async beginTransaction(): Promise<void> {
    await this.connection.beginTransaction();
  }

  public async commit(): Promise<void> {
    await this.connection.commit();
  }

  public async rollback(): Promise<void> {
    await this.connection.rollback();
  }
}

export default InitDB;