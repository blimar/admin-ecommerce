import DashboardLayout from '@/components/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';

interface Category {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

interface Props {
    category?: Category;
}

export default function CategoryForm({ category }: Props) {
    const { data, setData, post, errors, processing, put } = useForm({
        name: category ? category.name : '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (category) {
            put(route('categories.update', [category.id]), {
                onSuccess: () => {
                    Swal.fire({
                        title: 'Success',
                        text: 'Update success',
                        icon: 'success',
                    });
                },
            });
        } else {
            post(route('categories.store'));
        }
    };
    return (
        <DashboardLayout>
            <div className="p-5">
                <h2 className="text-2xl font-bold tracking-tight">Category</h2>
                <p className="text-muted-foreground">Form Category</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Label className="my-2">Name</Label>
                        <Input name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>

                    <Button disabled={processing} className="mt-2">
                        Submit
                    </Button>
                </form>
            </div>
        </DashboardLayout>
    );
}
