import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
        console.log("User: ", user);
        console.log("Account: ", account);
        const {name, email} = user
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/users/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                })
            })

            if (res.ok) {
                return user
            }
        } catch (error) {
            console.log(error);
        }

        return user
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
