<?php

namespace App\Http\Controllers;

use \App\Models\Book;
use App\Models\Borrower;
use \App\Models\User;
use http\Env\Response;
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
        $borrowerId = $request->borrower_id;

        $book = Book::where('id',$bookId)->first();
        $borrowerExists = Borrower::where('borrower_id' , $borrowerId )->where('bookId' , $bookId)->exists();
        if($borrowerExists){
            return response()->json('Book already borrowed by this user.' , 201);
        }

        if(!$book){
            return response()->json('Book not found.' , 404);
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
        return response()->json(['message' , 'Book borrow order created successfully'] , 200);
    }
}
