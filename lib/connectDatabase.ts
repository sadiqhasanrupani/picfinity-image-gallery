import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export default async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB_NAME}.qeweu2i.mongodb.net/?retryWrites=true&w=majority`
  );

  return client;
}
