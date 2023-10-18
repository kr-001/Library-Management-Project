@extends('layouts.app')
@section('content')
<div class="container d-flex flex-column justify-content-center align-items-center" style="height: 100vh;">
    <h1>Library Management System</h1>
    <div class="d-flex justify-content-around w-50">
        <a href="{{ route('create') }}" class="btn btn-primary">Login</a>
        <a href="{{ route('registerUser') }}" class="btn btn-primary">SignUp!</a>
    </div>
</div>
@endsection
