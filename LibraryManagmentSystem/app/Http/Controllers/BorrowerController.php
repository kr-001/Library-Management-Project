<?php

namespace App\Http\Controllers;

use App\Models\Borrower;
use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\Support\Facades\Log;

class BorrowerController extends Controller
{
    public function borrow(Request $request){
        $borrowerId = $request->borrowerId;
        $books = Borrower::where('borrower_id' , $borrowerId)->with(['book'])->get();
        return response()->json($books);
    }

    public function getBorrowers($id){
        Log::info($id);
        $borrowers = Borrower::where('bookId' , $id)->get()->toArray();
        return response()->json($borrowers);
    }

    public function getBorrowedBooks($borrowerId){
        $books = Borrower::where('borrower_id' , $borrowerId)->get();
        return response($books);

    }

}
