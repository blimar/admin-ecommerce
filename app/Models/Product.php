<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasUuids;
    protected $table = 'products';
    protected $fillable = [
        'name',
        'category_id',
        'description',
        'company',
        'price',
        'image',
    ];

    protected $casts = [
        'price' => 'float',
    ];

    // public $incrementing = false;
    // protected $keyType = 'string';

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function productVariants()
    {
        return $this->hasMany(ProductVariant::class);
    }
}
