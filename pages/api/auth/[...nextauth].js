import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  UserAuthentication,
  CreateUser,
} from "../../../server/controller/UsersController";

export const authOptions = {
  pages: {
    signIn: "/",
    eventList: "/eventsList",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
      },
      async authorize(credentials, req) {
        const { mobile, inputAuthCode, result } = credentials;

        const { IdCode, BirthDate, Mobile, Name, Family, FatherName, Gender } =
          credentials;

        let user;
        if (!mobile) {
          user = await CreateUser({
            Name,
            IdCode,
            Mobile,
            Family,
            Gender,
            BirthDate,
            FatherName,
          });
          if (user.status == "USER_REGISTERED") {
            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        } else {
          user = await UserAuthentication({
            mobile: mobile,
            inputAuthCode: inputAuthCode,
          });
          if (user.status == "SUCCESS") {
            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { restOfUser: user.user };
      }

      return token;
    },
    async session(seshProps) {
      return seshProps;
    },
  },
};

export default NextAuth(authOptions);
