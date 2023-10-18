@extends('layouts.app')
@section('content')
@include('layouts.navbar' , ['title' => "My Borrowings" , 'dropdown1_route' => '/logout' , 'dropdown1' => 'Logout'])
<div class="container">
    <div class="row">
        <h2>Book Borrowing List</h2>
        <hr>
    </div>
    <div class="row">
            @foreach($borrowings as $borrowing)
            <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">{{$borrowing->book->title}}</h5>
            <p class="card-text"><strong>Issue Date:</strong> Datetime: {{$borrowing->issue_date}}</p>
            <p class="card-text"><strong>Return Date:</strong>{{$borrowing->return_date}}</p>
            <a href="#" class="btn btn-primary">Return Book</a>
            </div>
            </div>
            @endforeach
    </div>
</div>
@endsection