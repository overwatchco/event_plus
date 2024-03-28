import { Metadata } from "next"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import Schedule from "@/components/requerimientos/schedule"
import { CreateDocumentoEvidencia } from "@/components/dashboard/button-file-evidencia"

export const metadata: Metadata = {
    title: "Event Plus | dashboard",
    description: "Gestion de contratos",
}

export default function DashboardPage() {
    return (
        <>
            <div className="hidden md:block">
                <div className="border-t">
                    <div className="">
                        <div className="grid">
                            <div className="col-span-5 lg:border-l">
                                <div className="h-full px-4 py-6 lg:px-8">
                                    <Tabs defaultValue="schedule" className="h-full space-y-6">
                                        <div className="space-between flex items-center">
                                            <TabsList>
                                                <TabsTrigger value="schedule">
                                                    Próximos Eventos
                                                </TabsTrigger>
                                            </TabsList>
                                            <div className="ml-auto mr-4">

                                                {/* Boton para crear documentos */}
                                                <CreateDocumentoEvidencia />

                                            </div>
                                        </div>
                                        <TabsContent
                                            value="schedule"
                                            className="h-full flex-col border-none p-0 data-[state=active]:flex"
                                        >

                                            <Schedule />

                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}