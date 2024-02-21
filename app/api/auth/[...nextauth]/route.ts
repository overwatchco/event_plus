import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import prisma from "@/app/lib/prisma";



export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,

    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
    ],

    session: {
        strategy: "jwt"
    },

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async jwt({ token, user, account, profile }) {

            const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } })
            token.roles = dbUser?.roles
            token.id = dbUser?.id ?? "No id"
            return token
        },
        async session({ session, user, token }) {

            if (session && session.user) {
                session.user.roles = token.roles
                session.user.id = token.id

            }
            return session
        }
    }
}


const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }