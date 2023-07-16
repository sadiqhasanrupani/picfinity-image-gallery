import { NextApiRequest as Req, NextApiResponse as Res } from "next";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

//^ connection of database
import connectDatabase from "@/lib/connectDatabase";

const handler = async (req: Req, res: Res) => {
  if (req.method !== "POST") {
    return;
  }

  try {
    const { username, password } = await req.body;

    const client = await connectDatabase();

    //^ getting user collection from the database
    const userCollection = client.db().collection("users");

    //^ getting the one document from the user collection
    const userDoc = await userCollection.findOne({
      userName: username,
    });

    if (!userDoc) {
      console.log(userDoc);
      res.status(422).json({ message: "username is in-valid", userDoc });
      client.close();
      return;
    }

    //^ if the user is matched then we will check his/her password.

    const passIsValid = await compare(password, userDoc.userPassword);

    if (!passIsValid) {
      client.close();
      return res.status(422).json({ message: "password is in-valid" });
    }

    //^ creating jwt token
    const token = jwt.sign(
      {
        id: userDoc._id.toString(),
        username: userDoc?.userName,
      },
      process.env.NEXTAUTH_SECRET_TOKEN as string,
      { expiresIn: "365d" }
    );

    return res.status(200).json({
      id: userDoc._id.toString(),
      name: userDoc?.userName,
      accessToken: token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error });
  }
};

export default handler;
