'use client';

import { Category, Product } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, router } from '@inertiajs/react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<
    Product & {
        category: Category;
    }
>[] = [
    {
        accessorKey: 'image',
        header: 'Gambar',

        cell: ({ row }) => {
            const product = row.original;
            const imageUrl = product.image
                ? `http://127.0.0.1:8000/storage/${product.image}`
                : 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=';

            return <img src={imageUrl} className="aspect-square w-[100px] object-cover" alt={product.name} />;
        },
    },

    {
        accessorKey: 'name',
        header: 'Name',
    },

    {
        // accessorKey: 'category_id',
        id: 'category',
        header: 'Kategori',
        cell: ({ row }) => {
            const product = row.original;

            return product.category.name;
        },
    },

    {
        accessorKey: 'price',
        header: 'Harga',
    },

    {
        accessorKey: 'created_at',
        header: 'Created At',
    },

    {
        id: 'actions',
        cell: ({ row }) => {
            const product = row.original;

            const handleDelete = () => {
                router.visit(`/dashboard/products/${product.id}`, {
                    method: 'delete',
                });
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            asChild
                            //   onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            <Link href={`/dashboard/products/${product.id}/edit`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={route('products.variants.index', [product.id])}>View variants</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete} variant="destructive">
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
