<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;


class BookController extends Controller
{
   public function index()
   {
    $books = Book::all();
    return view('books.index' , ['books'=>$books]);
   }

   public function create(){
    return view('books.create');
   }

   public function updateBook(){
    return view ('books.edit');
   }

   public function show(Book $book){
    return view('books.show' , compact('book'));
   }


   public function edit($id){
    $book = Book::findOrFail($id);
    return view('books.edit' , compact('book'));
   }

   public function store(Request $request)
   {
    $validatedData = $request->validate([
        'title'=>'required|max:255',
        'author'=>'required|max:255',
        'isbn'=>'required|max:20',
        'price'=>'required|max:10',
        'quantity'=>'required|integer|min:1',
        'cover_image' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
    ]);

    if($request->hasFile('cover_image'))
    {
        $coverImagePath = $request->file('cover_image')->store('bookCovers' , 'public');
    }

    $book = Book::create($validatedData);
    dd($book);
    return redirect()->route('books.index')->with('success' , 'Book added successfully');

   }

   public function update(Request $request , $id){
        $request->validate([
        'title'=>'required|max:255',
        'author'=>'required|max:255',
        'isbn'=>'required|max:255',
        'quantity'=>'required|integer|min:1',
        'price'=>'required|numeric|min:0'
    ]);
   
    $book = Book::findOrFail($id);

    $book->title = $request->input('title');
    $book->author = $request->input('author');
    $book->isbn = $request->input('isbn');
    $book->quantity = $request->input('quantity');
    $book->price = $request->input('price');

    $book->save();

    return redirect()->route('books.show' , $book->id)->with('success' , "Book Updated Successfully");

   }
}
