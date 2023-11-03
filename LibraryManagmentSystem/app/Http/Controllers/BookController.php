<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\Support\Facades\Log;


class BookController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
   public function index()
   {
    $books = Book::all();
    return  response()->json( $books);
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


   public function findBookById($id){
    $book = Book::findOrFail($id);
    $user = auth()->user();
    return response()->json([$book , $user ]);
   }

   public function store(Request $request)
   {
       try {
           $validatedData = $request->validate([
               'title'=>'required|max:255',
               'author'=>'required|max:255',
               'isbn'=>'required|max:20',
               'price'=>'required|max:10',
               'quantity'=>'required|integer|min:1',
               'coverImage' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
           ]);

           if($request->hasFile('coverImage'))
           {
               $coverImagePath = $request->file('coverImage')->store('bookCovers' , 'public');
               $validatedData['coverImage'] = $coverImagePath;
           }

           $book = Book::create($validatedData);

           return response()->json([
               'success' => true,
               'message' => 'Book added successfully',
               'book' => $book
           ], 201);
       } catch (\Exception $e) {
           return response()->json([
               'success' => false,
               'message' => 'Failed to add book',
               'error' => $e->getMessage()
           ], 500);
       }
   }



    public function update(Request $request , $id){
        Log::info($request->all());
        $request->validate([
        'title'=>'required|max:255',
        'author'=>'required|max:255',
        'isbn'=>'required|max:255',
        'quantity'=>'required|integer|min:1',
        'price'=>'required|numeric|min:0',
        'coverImage' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
    ]);

    $book = Book::findOrFail($id);

    $book->title = $request->input('title');
    $book->author = $request->input('author');
    $book->isbn = $request->input('isbn');
    $book->quantity = $request->input('quantity');
    $book->price = $request->input('price');
    if($request->hasFile('coverImage'))
    {
        $coverImagePath = $request->file('coverImage')->store('bookCovers' , 'public');
        $book->coverImage = $coverImagePath;
    }

    $book->save();

    return response()->json('Book Updated Successfully');

   }

   public function delete($id){
        $book = Book::findOrFail($id);
        $book->delete();

        return response()->json([
            'success'=>true,
            'message'=>"Book Deleted Successfully"
        ],200);
   }
}
