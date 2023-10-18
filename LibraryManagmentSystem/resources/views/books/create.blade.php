@extends('layouts.app')

@section('content')

<div class="container">
    <h1>Add a book</h1>
    <form method="POST" action="{{ route('storeBook') }}">
        @csrf 
        <div class="form-group">
            <label for="cover_image">Cover Image</label>
            <input type="file" name="cover_image" id="cover_image" class="form-control" accept="image/*">
        </div>
        <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" name="title" id="title" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="author">Author:</label>
            <input type="text" name="author" id="author" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="isbn">ISBN:</label>
            <input type="text" name="isbn" id="isbn" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="quantity">Quantity:</label>
            <input type="number" name="quantity" id="quantity" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="price">Price:</label>
            <input type="number" name="price" id="price" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Add Book</button>
    </form>
</div>

@endsection