import { getEventos } from "@/actions/evento-actions"
import { EventoCard } from "@/components/evidencias/card"


export default async function EvidenciasPage() {

    const data = await getEventos()
    console.log(data)
    return (
        <div className="container mt-5 grid grid-cols-3 gap-6">
            {data && data.map((evento) => (
                <EventoCard
                    key={evento.id}
                    nombre={evento.nombre}
                    descripcion={evento.descripcion}
                    id={evento.id}
                />
            ))}
        </div>
    )

}