import { MongoClient } from "mongodb";

export default async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@${process.env.MONGO_DB_NAME}.qeweu2i.mongodb.net/?retryWrites=true&w=majority`
  );

  return client;
}
