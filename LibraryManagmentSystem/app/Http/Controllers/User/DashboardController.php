<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\Contracts\Session\Session;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    

    public function index()
{
    $user = Auth::user();
    $books = Book::all();

    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }
    return response()->json(['user'=>$user]);
    // return view('user.dashboard' , compact('user' , 'books'));
}

    
}
