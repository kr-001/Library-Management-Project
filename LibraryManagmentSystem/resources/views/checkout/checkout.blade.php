@extends('layouts.app')
@section('content')
@include('layouts.navbar' , ['title'=>"Checkout Page" , "dropdown1_route" => "/dashboard" , 'dropdown1' => "Cancel"])
<div class="container">
   
    <form method="POST" action="{{route('checkoutPage')}}">
        @csrf
        <div class="row" style="text-align: center;">
            <h2>Fill Your Details</h2>
            <hr>
        </div>
        <div class="row my-4">
        <div class="col-4">
                <div class="form-group">
                    <label for='bookId'>Book ISBN:</label>
                    <input type="text" class="form-control" id = 'bookId' name="bookId" value="{{$book->isbn}}">
                </div>
        </div>
        <div class="col-4">
                <div class="form-group">
                    <label for='borrower_id'>Your ID:</label>
                    <input type="text" class="form-control" id = 'borrower_id' name="borrower_id" value="{{$user->id}}">
                </div>
        </div>
        <div class="col-4">
                <div class="form-group">
                    <label for='borrower_name'>Your Name:</label>
                    <input type="text" class="form-control" id = 'borrower_name' name="borrower_name" value="{{$user->name}}">
                </div>
        </div>
        <div class="row my-4">
        <div class="col-4">
                <div class="form-group">
                    <label for='borrower_contact'>Contact Number:</label>
                    <input type="text" class="form-control" id = 'borrower_contact' name="borrower_contact">
                </div>
        </div>
        <div class="row my-4">
            <div class="col-4">
            <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </div>
        </div>
    </div>
        </form>
</div>
@endsection