import { getRequerimientos } from "@/actions/requerimientos-actions"
import { DataTable } from "./table/data-table"
import { columns } from "./table/columns"

export default async function Schedule() {

    const data = await getRequerimientos()
    return (
        <DataTable data={data} columns={columns} />
    )
}
