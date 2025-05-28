<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('content');
            $table->string('author');
            $table->timestamps();

            // //Foreign Key ke tabel ategories
            // $table->unsignedBigInteger('category_id');

            // //Definisikan foreign key constraint
            // $table->foreign('category_id')
            //     ->references('id')
            //     ->on('categories');
            // // ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
