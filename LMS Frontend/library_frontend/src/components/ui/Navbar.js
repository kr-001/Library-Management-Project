import React from 'react'

export default function Navbar(props) {
  return (
    <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">{props.title}</a>

    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}
