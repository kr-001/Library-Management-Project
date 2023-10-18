<?php

namespace App\Http\Controllers;

use \App\Models\Book;
use App\Models\Borrower;
use \App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class CheckoutController extends Controller
{
    public function index($id)
    {
        $book =  Book::find($id);
        $user =  auth('api')->user();
        return view('checkout.checkout' , compact('book' , 'user'));
    }

    public function createOrder(Request $request)
    {
        //check book quantity
        $bookId = $request->bookId;

        $book = Book::where('isbn',$bookId)->first();
        
        if($book->quantity <= 0){
           return back()->withErrors(['message'=>'This Book is currently unavailable']);
        }else{
            $book->quantity--;
            $book->save();
        }


        $borrower = new Borrower;
        $borrower->bookId = $request->bookId;
        $borrower->borrower_id = $request->borrower_id;
        $borrower->borrower_name = $request->borrower_name;
        $borrower->borrower_contact = $request->borrower_contact;
        $borrower->save();
        return redirect()->route('dashboard')->with('success' , 'Book Borrowed Successfully');
    }
}
