import { Separator } from "@/components/ui/separator";
import { Payment, columns } from "@/components/empresas/columns"
import { DataTable } from "@/components/empresas/data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
    // ...
  ]
}
export default async function EmpresasPage() {
  const data = await getData()
  return (
    <div className="space-y-6">
      <Separator />
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>

  )
}
