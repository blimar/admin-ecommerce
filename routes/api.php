<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\ProductVariantController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::resource('/products', ProductController::class);
// Route::resource('/products.variants', ProductVariantController::class);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/orders', [OrderController::class, 'createOrder']);
});
