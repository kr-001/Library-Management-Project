@extends('layouts.app')
@section('content')
<div class="container">
<h1>{{$book->title}}</h1>
<p>By:<em> {{$book->author}}</em></p>
</div>
@endsection