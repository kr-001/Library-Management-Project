@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Edit Book</h1>

    <!-- Display validation errors if there are any -->
    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif

    <form method="POST" action="{{ route('books.update', $book->id) }}">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" name="title" value="{{ $book->title }}">
        </div>

        <div class="form-group">
            <label for="author">Author</label>
            <input type="text" class="form-control" id="author" name="author" value="{{ $book->author }}">
        </div>

        <div class="form-group">
            <label for="isbn">ISBN</label>
            <input type="text" class="form-control" id="isbn" name="isbn" value="{{ $book->isbn }}">
        </div>

        <div class="form-group">
            <label for="quantity">Quantity Available</label>
            <input type="number" class="form-control" id="quantity" name="quantity" value="{{ $book->quantity }}">
        </div>

        <div class="form-group">
            <label for="price">Price Per Book</label>
            <input type="text" class="form-control" id="price" name="price" value="{{ $book->price }}">
        </div>

        <button type="submit" class="btn btn-primary">Update Book</button>
    </form>
</div>
@endsection
