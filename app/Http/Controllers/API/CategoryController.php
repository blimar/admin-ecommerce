<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::with('products')->get();
        return response()->json([
            'data' => $categories,
            'message' => 'get category success',
            'error' => false,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'unique:categories,name'],
        ]);
        $category = Category::create($data);

        return response()->json([
            'data' => $category,
            'message' => 'create category success',
            'error' => false,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::with('products')->find($id);

        return response()->json([
            'data' => $category ?? null,
            'message' => $category ? 'Get Category Success' : 'Category not found',
            'error' => $category ? false : true,
        ], $category ? 200 : 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'name' => ['required', 'string', "unique:categories,name,{$category->id}"],
        ]);

        $category->update($data);

        return response()->json([
            'data' => $category,
            'message' => 'Update category success',
            'error' => false,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json([
            'data' => null,
            'message' => 'Delete category success',
            'error' => false,
        ], 200);
    }
}
