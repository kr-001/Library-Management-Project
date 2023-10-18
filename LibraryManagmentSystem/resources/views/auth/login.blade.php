@extends('layouts.app')

@section('content')
@if(session('success'))
<div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>{{session('success')}}</strong>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
@endif
<div class="container">
    <h2>User Login</h2>
    <form id="login-form">
        @csrf
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input type="email" name="email" id="email" class="form-control" placeholder="email" aria-describedby="helpId">
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password:</label>
          <input type="password" name="password" id="password" class="form-control" placeholder="password" aria-describedby="helpId">
        </div>
        <div class="mb-3">
            <button class="btn btn-primary" type="button" id="login-button">Submit</button>
        </div>
    </form>
</div>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const loginForm = document.getElementById('login-form');
        const loginButton = document.getElementById('login-button');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        loginButton.addEventListener('click', function () {
            loginButton.disabled = true; // Disable the button during the request
            const email = emailInput.value;
            const password = passwordInput.value;

            axios.post('/api/login', {
                email: email,
                password: password
            })
            .then(function (response) {
                const { access_token, redirect } = response.data;
                localStorage.setItem('token', access_token);
                window.location.href = redirect; // Redirect to the user dashboard or other page
            })
            .catch(function (error) {
                console.error('Login error:', error);
                alert('Login failed. Please check your credentials.');
            })
            .finally(function () {
                loginButton.disabled = false; // Re-enable the button after the request
            });
        });
    });
</script>
@endsection