@extends('layouts.app')

@section('content')
    @include('layouts.navbar', ["title" => "Dashboard", "dropdown1_route" => "/myBorrowings", "dropdown1" => "My Borrowings"])

    @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{{ session('success') }}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif

    <div class="container">
        <div class="row">
            <div class="col">
                <h2>Welcome, <span id="user-name"></span>!</h2>
                <p>Role: <span id="user-role"></span></p>
            </div>
            <div class="col">
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" id="logout-button" class="btn btn-primary">Logout</button>
                </form>
            </div>
        </div>
        <hr>
    </div>

    <div class="container">
        <h2>Book List</h2>
        <ul class="list-group">
            @foreach($books as $book)
                <li class="list-group-item" style="margin-top: 20px;">
                    <strong>Title:</strong> {{ $book->title }}<br>
                    <strong>Author:</strong> {{ $book->author }}<br>
                    <strong>Price:</strong> {{ $book->price }}<br>
                    <strong>Quantity:</strong> {{ $book->quantity }}<br>
                    <a href="{{ route('checkout', $book->id) }}" class="btn btn-primary" id="borrowButton">Borrow</a>
                </li>
            @endforeach
        </ul>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Fetch user data and populate the HTML
        axios.get('/api/user')
            .then(function(response) {
                const user = response.data.user;
                document.getElementById('user-name').textContent = user.name;
                document.getElementById('user-role').textContent = user.role;
            })
            .catch(function(error) {
                console.error('User Data Error: ', error);
            });

        // Add your click event listener for the logout button here
        document.getElementById('logout-button').addEventListener('click', function(e) {
            if (token) {
                axios.post('/api/logout')
                    .then(function(response) {
                        localStorage.removeItem('token');
                        window.location.href = '/userLogin';
                    })
                    .catch(function(error) {
                        console.error('Logout Error: ', error);
                    });
            } else {
                window.location.href = '/userLogin';
            }
        });
    </script>
@endsection