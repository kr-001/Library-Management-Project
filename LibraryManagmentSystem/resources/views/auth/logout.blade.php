<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
    {{ csrf_field() }}
</form>
<a href="#" onclick="event.preventDefault();document.getElementById('logout-form').submit();">
    Logout
</a>
