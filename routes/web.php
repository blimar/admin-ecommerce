<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductVariantController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/about', AboutController::class);
// Route::get('/contact', ContactController::class);
// Route::resource('/categories', CategoryController::class)->except([
//     'store',
//     'update',
//     'destroy',
// ]);

// Route::get('/store', [CategoryController::class, 'store']);

// Route::get('/', function () {
//     return inertia('index');
// });

// Route::get('/products', function () {
//     return inertia('product/index');
// });

// Route::get('/orders', function () {
//     return inertia('order/index');
// });

// Route::get('/users', function () {
//     return inertia('user/index');
// });

// Route::get('/articles', function () {
//     return inertia('article/index');
// });

// Route::get('/dashboard', function () {
//     return inertia('dashboard1/index');
// });

// Route::get('/profile', function () {
//     return inertia('profile/index');
// });



Route::prefix('/admin')->middleware([
    // 'auth', 'admin'
])->group(function () {
    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::resource('products.variants', ProductVariantController::class);
    Route::get('/dashboard', function () {
        return inertia('home');
    })->name('dashboard');

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

Route::get('/login', function () {
    return inertia('login');
})->name('login');

Route::post('/login', [AuthController::class, 'authenticate']);



