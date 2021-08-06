import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
  ],
  // emailのドメイン制限を入れたい場合は以下のcallbacksを入れてください
  callbacks: {
    signIn: async (user, account, profile) => {
      if (
        account.provider === "google" &&
        profile.verified_email === true &&
        profile.email.endsWith("@gmail.com")
      ) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    },
  },
  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
};

export default (req, res) => NextAuth(req, res, options);
