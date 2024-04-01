import { obtenerItemsYRequerimientos } from "@/actions/items-actions";
import { ItemsCard } from "@/components/evidencias/card"

export default async function EvidenciasIdPage({ params }: { params: { id: string } }) {
    try {
        const data = await obtenerItemsYRequerimientos(params.id);
        console.log(params.id)

        return (
            <div className="container mt-5 grid grid-cols-3 gap-6">
                {data && data.map((item) => (
                    <ItemsCard
                        key={item.id}
                        //TODO: ARREGLAR EL TIPADO DE ESTA PARTE
                        item={item}
                    />
                ))}
            </div>
        );
    } catch (error) {
        console.error("Error al obtener los Items y Requerimientos:", error);
        return <div>Error al cargar los datos</div>;
    }
}
