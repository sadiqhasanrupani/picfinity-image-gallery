import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { WithId, Document } from "mongodb";

import connectDatabase from "@/lib/connectDatabase";
import { verifyPassword } from "@/lib/auth/auth";

interface MyUser extends User {
  id: string;
  userName?: string;
}

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        // Add your credential options here
      },
      async authorize(credentials: Record<string, string> | undefined, req) {
        const client = await connectDatabase();

        const userCollection = client
          .db()
          .collection<WithId<Document>>("users");

        const userDocument = await userCollection.findOne({
          userName: credentials?.userName,
        });

        if (!userDocument) {
          client.close();
          throw new Error("No user found!");
        }

        const passIsValid = verifyPassword(
          credentials?.password as string,
          userDocument.userPassword
        );

        if (!passIsValid) {
          client.close();
          throw new Error("Could not log you in.");
        }

        const user: MyUser = {
          id: userDocument._id.toString(),
          userName: userDocument.userName as string,
        };

        client.close();

        return user;
      },
    }),
  ],
});
