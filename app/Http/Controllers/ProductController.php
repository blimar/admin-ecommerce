<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category')->get();
        return inertia('product/index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return inertia('product/form', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // berpatokan pada fillable di model
        $data = $request->validate([
            'name' => ['required', 'string', 'unique:products,name'],
            'category_id' => ['required', 'exists:categories,id'],
            'description' => ['nullable', 'string'],
            'company' => ['required', 'string'],
            'price' => ['required', 'numeric'],
            'image' => ['required', 'image', 'max:2048'],
        ]);

        $image_url = $request->file('image')->store('products', 'public');
        $data['image'] = $image_url;

        Product::create($data);

        return redirect()->route('products.index'); // lihat di route list terminal
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product = Product::find($product->id);
        return response()->json($product);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();
        return inertia('product/form', compact('product', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        // dd($request->all());

        // copy dari store
        $data = $request->validate([
            'name' => ['required', 'string', "unique:products,name,{$product->id}"],
            'category_id' => ['required', 'exists:categories,id'],
            'description' => ['nullable', 'string'],
            'company' => ['required', 'string'],
            'price' => ['required', 'numeric'],
        ]);

        if ($request->hasFile('image')) {
            $image_url = $request->file('image')->store('products', 'public');
            $data['image'] = $image_url;
        }

        $product->update($data);

        return redirect()->route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return back();
    }
}
