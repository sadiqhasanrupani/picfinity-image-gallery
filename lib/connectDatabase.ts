import { MongoClient } from "mongodb";

export default async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://sadiqhasan:BDMsJxAk0HyPHML9@image-gallery.qeweu2i.mongodb.net/?retryWrites=true&w=majority`
  );

  return client;
}
