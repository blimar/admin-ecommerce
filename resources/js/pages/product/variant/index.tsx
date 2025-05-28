import DashboardLayout from '@/components/layouts/dashboard-layout';
import { Product, ProductVariant } from '@/types';
import { columns } from './columns';
import { DataTable } from './data-table';

interface Props {
    product: Product;
    variants: ProductVariant;
}

export default function ProductVariantPage({ product, variants }: Props) {
    return (
        <DashboardLayout>
            <div className="p-10">
                <h1 className="text-2xl font-bold tracking-tight">Halaman Varian </h1>
                <p className="text-muted-foreground">List Variant {product.name}</p>

                <div>
                    <DataTable productId={product.id} columns={columns} data={variants} />
                </div>
            </div>
        </DashboardLayout>
    );
}
