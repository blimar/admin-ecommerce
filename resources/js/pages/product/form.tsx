import DashboardLayout from '@/components/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import {
    FileUpload,
    FileUploadDropzone,
    FileUploadItem,
    FileUploadItemDelete,
    FileUploadItemMetadata,
    FileUploadItemPreview,
    FileUploadList,
    FileUploadTrigger,
} from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Category, Product } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { Upload, X } from 'lucide-react';
import React from 'react';

// interface Product {
//   id: string
//   name: string
//   category_id: string
//   description: string
//   company: string
//   price: number
//   created_at: Date;
//   updated_at: Date;
// }

interface Props {
    categories: Category[];
    product?: Product;
}

export default function ProductForm({ categories, product }: Props) {
    const { data, setData, post, errors, processing, put } = useForm<{
        name: string;
        category_id: string;
        description: string;
        company: string;
        price: string;
        image: File | null;
    }>({
        name: product ? product.name : '',
        category_id: product ? product.category_id : '',
        description: product ? product.description : '',
        company: product ? product.company : '',
        price: product ? product.price : '',
        image: null,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (product) {
            // put('/dashboard/products/' + product.id);

            router.post(
                route('products.update', [product.id]),
                {
                    ...data,
                    _method: 'put',
                },
                {
                    preserveScroll: true,
                },
            );
        } else {
            post(route('products.store'), {
                preserveScroll: true,
            });
        }
    };

    return (
        <DashboardLayout>
            <div className="p-5">
                <h2 className="text-2xl font-bold tracking-tight">Product</h2>
                <p className="text-muted-foreground mb-4">Form Product</p>

                <form onSubmit={handleSubmit}>
                    <div>
                        <Label className="my-2">Nama</Label>
                        <Input name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mb-4" />
                        {errors.name && <p>{errors.name}</p>}

                        <div>
                            <Label className="my-2">Kategori</Label>
                            <Select required value={data.category_id} onValueChange={(e) => setData('category_id', e)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Kategori" className="" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Kategori</SelectLabel>
                                        {categories.map((category) => (
                                            <SelectItem value={category.id}>{category.name}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <Label className="my-2">Deskripsi</Label>
                        <Textarea
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mb-4"
                        />
                        <div>
                            <Label className="my-2">Perusahaan</Label>
                            <Input name="company" value={data.company} onChange={(e) => setData('company', e.target.value)} className="mb-4" />
                        </div>

                        <div>
                            <Label className="my-2">Harga</Label>
                            <Input
                                type="number"
                                name="price"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className="mb-4"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Image</Label>
                            <FileUpload
                                name="image"
                                maxFiles={1}
                                accept="image/*"
                                maxSize={5 * 1024 * 1024}
                                className="w-full"
                                value={data.image ? [data.image] : undefined}
                                onValueChange={(e) => setData('image', e[0])}
                            >
                                <FileUploadDropzone>
                                    <div className="flex flex-col items-center gap-1 text-center">
                                        <div className="flex items-center justify-center rounded-full border p-2.5">
                                            <Upload className="text-muted-foreground size-6" />
                                        </div>
                                        <p className="text-sm font-medium">Drag & drop files here</p>
                                        <p className="text-muted-foreground text-xs">Or click to browse (max 1 file, up to 2MB each)</p>
                                    </div>
                                    <FileUploadTrigger asChild>
                                        <Button variant="outline" size="sm" className="mt-2 w-fit">
                                            Browse files
                                        </Button>
                                    </FileUploadTrigger>
                                </FileUploadDropzone>
                                <FileUploadList>
                                    {data.image && (
                                        <FileUploadItem value={data.image}>
                                            <FileUploadItemPreview />
                                            <FileUploadItemMetadata />
                                            <FileUploadItemDelete asChild>
                                                <Button variant="ghost" size="icon" className="size-7">
                                                    <X />
                                                </Button>
                                            </FileUploadItemDelete>
                                        </FileUploadItem>
                                    )}
                                </FileUploadList>
                            </FileUpload>

                            {product?.image && !data.image && (
                                <div className="flex items-center gap-5 rounded-lg border p-3">
                                    <img
                                        className="aspect-square w-20 rounded object-cover"
                                        src={`http://127.0.0.1:8000/storage/${product.image}`}
                                        alt=""
                                    />
                                    <p>{product.image.replace('product/', '')}</p>
                                </div>
                            )}

                            {errors.image && <p className="text-red-500">{errors.image}</p>}
                        </div>
                    </div>

                    <Button disabled={processing} className="mt-4">
                        Submit
                    </Button>
                </form>
            </div>
        </DashboardLayout>
    );
}
