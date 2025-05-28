<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class ProductVariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Product $product)
    {
        $variants = ProductVariant::where('product_id', $product->id)->get();
        // $variants = ProductVariant::with('product')->get();
        return response()->json([
            'data' => $variants,
            'message' => 'get variant success',
            'error' => false,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'variant_name' => ['required', 'string'],
            'product_id' => ['required', 'string', 'exists:products,id'],
            'stock' => ['required', 'numeric'],
            'image' => ['required', 'image', 'max:2048']
        ]);

        $image_url = $request->file('image')->store('variant', 'public');
        $data['image'] = $image_url;

        $variant = ProductVariant::create($data);
        return response()->json([
            'data' => $variant,
            'message' => 'create variant success',
            'error' => false,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, ProductVariant $variant)
    {
        $variant = ProductVariant::where('product_id', $variant->id)->get();
        return response()->json([
            'data' => $variant ?? null,
            'message' => $variant ? 'get variant success' : 'variant not found',
            'error' => $variant ? false : true,
        ], $variant ? 200 : 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id, ProductVariant $variant)
    {
        $data = $request->validate([
            'variant_name' => ['required', 'string', "unique:variants,name,{$variant->id}"],
            'product_id' => ['required', 'string', 'exists:products,id'],
            'stock' => ['required', 'numeric'],
            'image' => ['required', 'image', 'max:2048']
        ]);


        if ($request->hasFile('image')) {
            $image_url = $request->file('image')->store('variant', 'public');
            $data['image'] = $image_url;
        }

        $variant->update($data);

        return response()->json([
            'data' => $variant,
            'message' => 'update variant success',
            'error' => false,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
