import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


console.log( process.env.JWT_SECRET  )

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log("Credentials received:", credentials);
        const res = await fetch("http://localhost:3000/api/registrationApi", {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            action: "login",
          }),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();
        console.log("User received from API:", user);

        if (res.ok && user && user.user) {
          return {
            email: user.user.email,
            name: user.user.name,
            id: user.user.id,
          };
        }

        throw new Error(user.error || "Login failed");
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      console.log("JWT Callback: Token:", token);
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;

      console.log("JWT Callback: Token:", session);
      return session;
    },
  },
});
