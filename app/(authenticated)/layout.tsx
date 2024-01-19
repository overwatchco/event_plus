import { MainNavbar } from "@/components";

export default function AuthenticatedLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <MainNavbar />
            {children}
        </div>
    );
}