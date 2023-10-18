@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Register</h2>
    <form method="POST" action="{{route('register')}}">
        @csrf
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" class="form-control" id="name" name="name">
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" name="email">
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" id="password" name="password">
        </div>
        <div class="form-group">
            <label for="role">Select Role:</label>
            <select class="form-select" aria-label="Select Role" id="role" name="role">
                <option selected disabled>Select Role</option>
                <option value="Student">Student</option>
                <option value="Librarian">Librarian</option>
            </select>
        </div>


        <div class="form-group">
            <button class="btn btn-primary" type="submit">Submit</button>
        </div>

    </form>
</div>




@endsection