import { CreateDialog } from "@/components/empresas/create-dialog"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
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
            <h2 className="text-2xl font-bold tracking-tight">Empresas</h2>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit...
            </p>
          </div>
          <div>
            <CreateDialog/>
          </div>
        </div>
        {children}

      </div>
    </>
  )
}