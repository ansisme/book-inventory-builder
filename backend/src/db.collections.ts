import { Collection, MongoClient } from "mongodb";

let BOOKS: Collection<any>;

export async function connectToDb() {
  const client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  const db = client.db();
  BOOKS = db.collection("books");
  console.log("MongoDB connected and collections initialized", BOOKS);
}

export { BOOKS };
