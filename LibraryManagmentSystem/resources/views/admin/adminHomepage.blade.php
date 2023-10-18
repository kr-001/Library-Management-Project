@extends('layouts.app')
@section('content')
@include('layouts.navbar', ['title' => "Library Management Admin Panel" , "dropdown1_route" => "/books" , "dropdown1"=>"Manage Books"]);
<div class="container">
     <div class="row">
        <div class="col">
            <h2>Welcome  {{$user->name}}!</h2>
            <p>Role: {{$user->role}}</p>
        </div>
        <div class="col">
        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button type="submit" class="btn btn-primary">Logout</button>
        </form>
        </div>
     </div>
    <hr>
</div>


@endsection