import { getEventos } from "@/actions/evento-actions";
import { DataTable } from "@/components/evidencias/table/data-table";
import { columns } from "@/components/evidencias/table/columns";


export default async function EvidenciasPage() {

    const data = await getEventos()
    return (
        <div className="container mx-auto py-5">
            <DataTable columns={columns} data={data} />
        </div>
    )

}