import { NextApiRequest as Req, NextApiResponse as Res } from "next";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export default async function handler(req: Req, res: Res) {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_DB_NAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB_NAME}.qeweu2i.mongodb.net/?retryWrites=true&w=majority`
  );

  if (req.method === "POST") {
    try {
      interface ReqData {
        userName?: string;
        userPass?: string;
        userConfirmPass?: string;
      }

      //^ getting the username, password, and also the confirm password from request body.
      const { userName, userPass, userConfirmPass }: ReqData = await req.body;

      //^ validating the body data
      if ((userName?.length as number) <= 5 && !userName?.includes(" ")) {
        return res.status(422).json({
          message: "Username should be more than 5 char without spaces.",
        });
      }

      if ((userPass?.length as number) <= 6 && !userPass?.includes(" ")) {
        return res.status(422).json({
          message: "Password should be more than 5 char without spaces.",
        });
      }

      if (userConfirmPass !== userPass) {
        return res.status(422).json({ message: "Password did not matched." });
      }

      //^ connecting to the database.
      const db = client.db();

      const users = db.collection("users");
      const user: Array<any> = await users
        .find({ userName: userName as string })
        .toArray();

      if (user.length > 0) {
        return res.status(401).json({
          message: `${user[0].userName} already exists, try another username. `,
        });
      }

      //^ converting the password into bcrypt hash system.
      const hashPassword = await bcrypt.hash(userPass as string, 12);

      //^ adding the user's data inside the "users" document in mongodb collection
      const insertUser = await users.insertOne({
        userName,
        userPassword: hashPassword,
      });

      client.close();

      return res.status(200).json({
        message: "Bruh",
        insertUser,
      });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong", error });
    }
  }
}
