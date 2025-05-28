import DashboardLayout from '@/components/layouts/dashboard-layout';
import { Category, Product } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from './data-table';

interface Props {
    products: (Product & {
        category: Category;
    })[];
}

export default function ProductPage({ products }: Props) {
    console.log(products);
    return (
        <>
            <Head title="product" />
            <DashboardLayout>
                <div className="p-8">
                    <h1 className="text-2xl font-bold tracking-tight">Halaman Produk</h1>
                    <p className="text-muted-foreground">List Produk</p>

                    <div>
                        <DataTable columns={columns} data={products} />
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}
