import { obtenerItemsYRequerimientos } from "@/actions/items-actions";
import { ItemsCard } from "@/components/evidencias/card"

export default async function EvidenciasIdPage({ params }: { params: { slug: string } }) {
    try {
        const data = await obtenerItemsYRequerimientos(params.slug);

        return (
            <div className="container mt-5 grid grid-cols-3 gap-6">
                {data && data.map((item) => (
                    <ItemsCard
                        key={item.id}
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
