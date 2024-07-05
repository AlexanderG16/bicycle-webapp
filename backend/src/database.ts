import { createPool, FieldPacket, OkPacket, PoolConnection, ResultSetHeader } from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

class InitDB {
    private static instance: InitDB;
    private connection: PoolConnection;
    private transaction: Transaction | null;

    private constructor(connection: PoolConnection) {
        this.connection = connection;
        this.transaction = null;
    }

    public static async getInstance(): Promise<InitDB> {
        if (!InitDB.instance) {
            const connection = await createPool({
                host: DB_HOST || 'localhost',
                user: DB_USER || 'root',
                password: DB_PASSWORD || '',
                database: DB_NAME || 'hobigowes',
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            }).getConnection();
            InitDB.instance = new InitDB(connection);
        }
        return InitDB.instance;
    }

    public async beginTransaction(): Promise<void> {
        if (!this.transaction) {
            this.transaction = Transaction.getInstance(this.connection);
            await this.transaction.beginTransaction();
        }
    }

    public async commit(): Promise<void> {
        if (this.transaction) {
            await this.transaction.commit();
            this.transaction = null;
        }
    }

    public async rollback(): Promise<void> {
        if (this.transaction) {
            await this.transaction.rollback();
            this.transaction = null;
        }
    }

    public async query(query: string, values?: any[]): Promise<[any, FieldPacket[] | OkPacket[] | ResultSetHeader[]]> {
        if (this.transaction) {
            return this.transaction.query(query, values);
        } else {
            return this.connection.execute(query, values);
        }
    }

    public release(): void {
        if (this.transaction) {
            this.transaction.rollback(); // Rollback the transaction if it's still open
            this.transaction = null;
        }
        this.connection.release();
    }
}

class Transaction {
    private static instance: Transaction | null = null;
    private connection: PoolConnection;
    private inTransaction: boolean;

    private constructor(connection: PoolConnection) {
        this.connection = connection;
        this.inTransaction = false;
    }

    public static getInstance(connection: PoolConnection): Transaction {
        if (!Transaction.instance) {
            Transaction.instance = new Transaction(connection);
        }
        return Transaction.instance;
    }

    public async beginTransaction(): Promise<void> {
        if (!this.inTransaction) {
            await this.connection.beginTransaction();
            this.inTransaction = true;
        }
    }

    public async commit(): Promise<void> {
        if (this.inTransaction) {
            await this.connection.commit();
            this.inTransaction = false;
        }
    }

    public async rollback(): Promise<void> {
        if (this.inTransaction) {
            await this.connection.rollback();
            this.inTransaction = false;
        }
    }

    public async query(query: string, values?: any[]): Promise<[any, FieldPacket[] | OkPacket[] | ResultSetHeader[]]> {
        return this.connection.execute(query, values);
    }
}

export default InitDB;