import * as React from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { MultiUploader } from "./multi-uploader";




interface Requerimiento {
    id: string;
    subevento: string;
    fecha: Date,
    item: string
}

interface Item {
    id: string;
    servicio: string;
    descripcion: string;
    Requerimiento: Requerimiento[];
}

interface Props {
    item: Item;
}
export default async function ItemsCard({ item }: Props) {


    return (
        <Card className="w-[350px] col-span-1">
            <CardHeader>
                <CardTitle>Item {item.servicio}</CardTitle>
                <CardDescription>{item.descripcion}</CardDescription>
            </CardHeader>
            <CardContent>


                {item && item.Requerimiento.map((requerimiento) => (
                    <Accordion type="single" collapsible key={requerimiento.id}>
                        <AccordionItem value={requerimiento.id}>
                            <AccordionTrigger>{requerimiento.subevento}</AccordionTrigger>
                            <AccordionContent>
                                <section>
                                    <p>Fecha: {new Date(requerimiento.fecha).toLocaleDateString()}</p>
                                    <p>Item: {requerimiento.item}</p>
                                </section>
                                <MultiUploader key={requerimiento.id} requerimientoId={requerimiento.id}></MultiUploader>
                            </AccordionContent>

                        </AccordionItem>
                    </Accordion>
                ))}
            </CardContent>
            <CardFooter className="flex justify-between">
            </CardFooter>
        </Card>
    )
}



