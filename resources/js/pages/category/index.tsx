import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Head } from "@inertiajs/react";
import { log } from "console";
import { Category } from "@/types";
import { DataTable } from "./data-table";
import { columns } from "./columns";

// interface Category{
//     id: number;
//     name: string;
//     created_at: Date;
//     updated_at: Date;
// }

interface Props {
    categories: Category[]
}

export default function CategoryPage({categories}:Props) {
    console.log(categories)

  return (
    <>
    <Head title="category"/>
    <DashboardLayout>
      <div className="p-10">
          <h1 className="text-2xl font-bold tracking-tight">Halaman Kategori</h1>
          <p className="text-muted-foreground">List Kategori</p>

          <div className="mt-5 ">
            <DataTable columns={columns} data={categories} />
          </div>
      </div>
    </DashboardLayout>
    </>
  )
}
