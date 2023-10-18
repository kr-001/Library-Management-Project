<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Borrower;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
class BorrowingsController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $borrowings = Borrower::where('borrower_id', $user->id)->with('book')->get();
        return view('user.borrowings', compact('borrowings'));
    }
    
}

