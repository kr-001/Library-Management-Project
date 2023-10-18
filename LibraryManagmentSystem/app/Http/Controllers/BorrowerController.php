<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;

class BorrowerController extends Controller
{
    public function borrow(){
        return view('admin.adminHomepage');
    }

}
