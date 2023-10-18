@extends('layouts.app')
@section('content')
<h1>Books List</h1>
<a href="{{route('addBook')}}" class="btn btn-primary">Add Book</a>
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Quantity Available</th>
            <th>Price Per Book<th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
       
        @foreach($books as $book)
        <tr>
            <td>{{$book->title}}</td>
            <td>{{$book->author}}</td>
            <td>{{$book->isbn}}</td>
            <td>{{$book->quantity}}</td>
            <td>₹ {{$book->price}}</td>
            <td><a href="{{ route('books.edit', $book->id) }}" class="btn btn-primary">Edit</a></td>
            <td><button class="btn btn-primary" >Delete</button></td>
        </tr>
        @endforeach
    </tbody>
</table>

@endsection