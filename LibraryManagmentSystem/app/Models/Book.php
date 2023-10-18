<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $table = 'books';
    protected $fillable = ['title' , 'author' , 'isbn' , 'price' , 'quantity' , 'coverImage'];
    use HasFactory;


    public function borrowers()
    {
        return $this->hasMany(Borrower::class , 'bookId');
    }
}
