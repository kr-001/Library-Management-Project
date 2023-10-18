<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use League\CommonMark\Extension\Table\TableExtension;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions' , function(Blueprint $table){
            $table->id();
            $table->unsignedBigInteger('book_id');
            $table->unsignedBigInteger('borrower_id');
            $table->date('borrowed_date');
            $table->date('return_date')->nullable();
            $table->date('returned_date')->nullable();
            $table->string('status')->default('borrowed');
            $table->timestamps();

            //F.Keys
            $table->foreign('book_id')->references('id')->on('books');
            $table->foreign('borrower_id')->references('id')->on('borrowers');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
