import { Separator } from "@/components/ui/separator";
import { columns } from "@/components/empresas/table/columns"
import { DataTable } from "@/components/empresas/table/data-table"
import { getListEmpresa } from "@/actions/empresa-actions";



export default async function EmpresasPage() {

  // TODO: Poner que esto este filtrado por el usuario que es encargado de la empresa
  const data = await getListEmpresa()
  return (

    <>
      <Separator />
      <div className="container mx-auto py-5">
        <DataTable columns={columns} data={data} />
      </div>
    </>

  )
}
