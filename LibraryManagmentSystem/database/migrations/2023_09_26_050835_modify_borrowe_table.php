<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('borrowers', function (Blueprint $table) {
            $table->string('order_id');
            $table->string('bookId');
            $table->string('borrower_id')->unique();
            $table->string('borrower_name');
            $table->string('issue_date');
            $table->string('return_date');
            $table->string('borrower_contact')->nullable();
            $table->dropColumn('name');
            $table->dropColumn('library_id');
            $table->dropColumn('contact');
            $table->dropColumn('address');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('borrowers', function (Blueprint $table) {
            //
        });
    }
};
