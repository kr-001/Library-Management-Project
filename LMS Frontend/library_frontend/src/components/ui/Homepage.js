import React from 'react'
import Navbar from './Navbar'
import Login from '../Auth/Login'
import { useNavigate } from 'react-router-dom'
export default function Homepage() {
    const navigate = useNavigate();
    const handleLogin = () =>{
        navigate('/login');
    }
    const handleRegister = () =>{
        navigate('/register');
    }
  return (
    <>
    <Navbar title = "Homepage"/>
    <div className='container'>
    
      <h1>Library Management System</h1>
      <div className='row'>
      <div className='col'>
      <button className='btn btn-primary' onClick={handleLogin}>Login</button>
      </div>
      <div className='col'>
        <button className='btn btn-primary' onClick={handleRegister}>Register</button>
      </div>
        
      </div>
      

    </div>
    </>
  )
}
