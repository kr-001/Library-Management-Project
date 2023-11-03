<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\BorrowerController;
use App\Http\Controllers\CheckoutController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::middleware(['api'])->group(function() {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/getAccount' , [AuthController::class , 'getaccount']);
    Route::get('/books' , [BookController::class , 'index']);
    Route::get('/findBookById/{id}' , [BookController::class , 'findBookById']);
    Route::post('/checkoutPage' , [CheckoutController::class , 'createOrder'])->name('checkoutPage');
    Route::get('/myBorrowings/{borrowerId}' , [BorrowerController::class , 'borrow']);
    Route::post('/logout',[AuthController::class , 'logout']);
    Route::delete('/books/{id}' , [BookController::class , 'delete']);
    Route::post('/updateBook/{id}' , [BookController::class , 'update']);
    Route::post('/storeBook' , [BookController::class , 'store']);
    Route::get('/getBorrowers/{id}' , [BorrowerController::class , 'getBorrowers']);
    Route::get('/getBorrowedBooks/{id}' , [BorrowerController::class , 'getBorrowedBooks']);
});
