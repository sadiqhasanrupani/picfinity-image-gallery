import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        //^ destructuring the credentials
        const { username, password } = credentials as any;

        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.status === 422) {
          const resData = await response.json();
          console.log(resData);

          throw new Error(resData.message);
        }

        if (!response.ok) {
          const resData = await response.json();

          throw new Error(resData.message || "Something went wrong");
        }

        const user = await response.json();

        return { name: user.name, id: user.id, email: user.accessToken };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET_TOKEN,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET_TOKEN,
  },
  pages: {
    signIn: "/",
    signOut: "/gallery",
  },
};

export default NextAuth(authOptions);
