import { UserNav } from "@/components/dashboard/user-nav";
import Image from "next/image"


export default function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex-col md:flex">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <Image
                        src="/vercel.svg"
                        alt="Vercel Logo"
                        className="dark:invert"
                        width={100}
                        height={24}
                        priority
                    />
                    <div className="ml-auto flex items-center space-x-4">
                        <UserNav />
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
}