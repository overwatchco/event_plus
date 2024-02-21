import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const getUserSessionServer = async () => {
    const session = await getServerSession(authOptions)
    return session?.user

}