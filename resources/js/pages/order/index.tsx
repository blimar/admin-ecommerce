import DashboardLayout from '@/components/layouts/dashboard-layout';
import { Order, User } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from './data-table';

interface Props {
    orders: (Order & {
        user: User;
    })[];
}

export default function OrderPage({ orders }: Props) {
    console.log(orders);
    return (
        <>
            <Head title="order" />
            <DashboardLayout>
                <div className="p-8">
                    <h1 className="text-2xl font-bold tracking-tight">Halaman Order</h1>
                    <p className="text-muted-foreground">List Order</p>
                    <div>
                        <DataTable columns={columns} data={orders} />
                    </div>
                    <div>{/* <DataTable columns={columns} data={products} /> */}</div>
                </div>
            </DashboardLayout>
        </>
    );
}
