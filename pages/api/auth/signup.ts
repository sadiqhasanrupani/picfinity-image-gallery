import { NextApiRequest as Req, NextApiResponse as Res } from "next";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

export default async function handler(req: Req, res: Res) {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@${process.env.MONGO_DB_NAME}.qeweu2i.mongodb.net/?retryWrites=true&w=majority`
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
      const user = await users.findOne({
        userName: userName as string,
      });

      console.log(`\n ${users} \n`);

      if (user) {
        res.status(401).json({
          message: `${user.userName} already exists, try another username. `,
        });

        return client.close();
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
