import { CreateDialog } from "@/components/contratos/dialogs/create-dialog"
import { Metadata } from "next"


export const metadata: Metadata = {
    title: "Contratos",
    description: "Gestiona los contratos de tu empresa",
}


interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <>
            <div className="hidden space-y-3 p-6 pb-16 md:block">
                <div className="flex justify-between items-center mx-10">
                    <div >
                        <h1 className="text-5xl font-bold tracking-tight">Contratos</h1>
                    </div>
                    <div>
                        <CreateDialog />
                    </div>
                </div>
                {children}

            </div>
        </>
    )
}