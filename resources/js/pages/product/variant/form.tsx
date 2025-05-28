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
import { Product, ProductVariant } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { Upload, X } from 'lucide-react';

interface Props {
    product: Product;
    variant?: ProductVariant;
}

export default function ProductVariantForm({ product, variant }: Props) {
    const { data, setData, post, errors, processing } = useForm<{
        variant_name: string;
        product_id: string;
        stock: string;
        image: File | null;
    }>({
        variant_name: variant ? variant.variant_name : '',
        image: null,
        product_id: product.id,
        stock: variant ? variant.stock : '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (variant) {
            // put('/dashboard/products/' + product.id);

            router.post(
                `/dashboard/products/${product.id}/variants/${variant.id}`,
                {
                    ...data,
                    _method: 'put',
                },
                {
                    preserveScroll: true,
                },
            );
        } else {
            post(`/dashboard/products/${product.id}/variants`, {
                preserveScroll: true,
            });
        }
    };
    return (
        <DashboardLayout>
            <div className="p-10">
                <h2 className="text-2xl font-bold tracking-tight">Variant</h2>
                <p className="text-muted-foreground mb-4">Create variant form for {product.name}</p>

                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <Label className="my-2">Variant Name</Label>
                            <Input
                                name="variant_name"
                                value={data.variant_name}
                                onChange={(e) => setData('variant_name', e.target.value)}
                                className="mb-4"
                            />
                            {errors.variant_name && <p>{errors.variant_name}</p>}
                        </div>

                        <div>
                            <Label className="my-2">Stok</Label>
                            <Input
                                type="number"
                                name="stock"
                                value={data.stock}
                                onChange={(e) => setData('stock', e.target.value)}
                                className="mb-4"
                            />
                            {errors.stock && <p>{errors.stock}</p>}
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

                            {variant?.image && !data.image && (
                                <div className="flex items-center gap-5 rounded-lg border p-3">
                                    <img
                                        className="aspect-square w-20 rounded object-cover"
                                        src={`http://127.0.0.1:8000/storage/${variant.image}`}
                                        alt=""
                                    />
                                    <p>{variant.image.replace('product/', '')}</p>
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
