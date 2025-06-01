'use client';

import { Order } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: 'user',
        header: 'User',
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
    },
    {
        accessorKey: 'total',
        header: 'Total',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'payment_method',
        header: 'Payment Method',
    },
    {
        accessorKey: 'payment_channel',
        header: 'Payment Channel',
    },
];
