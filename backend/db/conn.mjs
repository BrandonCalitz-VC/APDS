import de from "dotenv";
import { MongoClient } from "mongodb";

de.config();

const connectionString = process.env.MONGO_URI || "";

console.log(connectionString);
const client = new MongoClient(connectionString);


let conn;
try {
    conn = await client.connect();
    console.log("DB CONNECTED");
    
} catch (error) {
    console.log("ERROR CONNECTING TO DB");
    console.error(error);
}


let db = client.db("users")

export default db;
