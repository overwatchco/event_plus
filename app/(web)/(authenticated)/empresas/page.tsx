import { Separator } from "@/components/ui/separator";
import { columns } from "@/components/empresas/table/columns"
import { DataTable } from "@/components/empresas/table/data-table"
import prisma from "@/app/lib/prisma";
import { getUserSessionServer } from "@/auth/actions/auth-actions";



export default async function EmpresasPage() {

  const user = await getUserSessionServer()

  // TODO: Poner que esto este filtrado por el usuario que es encargado de la empresa
  const data = await prisma.empresa.findMany({ orderBy: { nombre: 'desc' }, where: { userId: user?.id } })
  return (

    <>
      <Separator />
      <div className="container mx-auto py-5">
        <DataTable columns={columns} data={data} />
      </div>
    </>

  )
}
