import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserNav } from "@/components/dashboard/user-nav";
import { NavMenu } from "@/components/navigation/navigation-menu"
import { getServerSession } from "next-auth";
import Image from "next/image"
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions)


    if (!session) {
        redirect('/api/auth/signin')

    }

    return (
        <div className="flex-col md:flex" >
            <div className="border-b">
                <div className="flex h-16 items-center justify-between px-4">

                    <Link href={"/dashboard"}>
                        <Image
                            src="/event+_horizontal_blanco.png"
                            alt="Event plus logo"
                            className="light:invert"
                            width={100}
                            height={24}
                            priority
                        />
                    </Link>

                    <NavMenu></NavMenu>


                    <div className="flex items-center space-x-4">
                        <UserNav />
                    </div>
                </div>
            </div>
            {children}
        </div >
    );
}