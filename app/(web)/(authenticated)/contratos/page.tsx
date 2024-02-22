import { getListContratos } from '@/actions/contrato-actions'
import { columns } from '@/components/contratos/table/columns'
import { DataTable } from '@/components/contratos/table/data-table'
import { Separator } from '@/components/ui/separator'

export default async function ContratosPage() {

    const data = await getListContratos()


    //NOTE: Estos pueden ser cards 

    return (

        <>

            <Separator />
            <div className="container mx-auto py-5">
                <DataTable columns={columns} data={data} />
            </div>

        </>

    )
}
