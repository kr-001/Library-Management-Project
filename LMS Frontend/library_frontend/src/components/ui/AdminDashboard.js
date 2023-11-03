import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import '../../css/StudentDashboad.css'
import '../../css/AdminDashboard.css'
import favicon from '../ico/favicon.ico';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [user, setUser] = useState(null);
    const [books , setBooks] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getAccount' , {
            headers:{
                Authorization : `Bearer ${token}`
            }
        })
            .then((response)=>{
                setUser(response.data)
            })
            .catch((error)=>{
                navigate('/login');
            })
    }, [navigate]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/books' , {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then((response)=>{
                setBooks(response.data);
            })
            .catch((error)=>{
                console.log(error);
        })
    }, []);
  

    const handleSubmit = () =>{
        console.log("BUTTON CLICKED");
        navigate('/addBook');
    }
    const handleLogout = () => {
        axios.post('http://127.0.0.1:8000/api/logout' ,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response)=>{
            console.log(response.message);
        })
        localStorage.removeItem(token);
        navigate('/login');
    }

    const handleViewBook = (bookId) => {
        navigate(`/viewBook/${bookId}`)
    }

    const handleUpdate = (bookId) => {
        navigate(`/updateBook/${bookId}`);
    }
    
    const handleDelete = (bookId) => {
        axios.delete(`http://127.0.0.1:8000/api/books/${bookId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data);
            setBooks(books.filter(book => book.id !== bookId));
            navigate('/adminDashboard');
        })
        .catch((error) => {
            console.log(error);
        });
    }
   
      
      
    
    
      return (
        <>
          
      
          <div className="sidebar" style={{ padding: '20px', borderRight: '1px solid black' }}>
            {user && (
              <div className="profile-section">
                <img src={favicon} alt="Profile Picture" className="profile-picture" />
                <h3 className="name">{user.name}</h3>
                <p className="email">{user.email}</p>
                <p className="role">{user.role}</p>
              </div>
            )}
            <hr className="horizontalLine-AdminDashboard"></hr>
            <a onClick={handleSubmit}>Add book</a>
            <a onClick={handleLogout}>Logout</a>
          </div>
      
          <div className='content'>
          <Navbar title="Admin Dashboard - Library Management System" />
            {books && (
              <ol className="list-group list-group-numbered">
                {books.map((book, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-start" style={{margin:'3px'}}>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{book.title}</div>
                      {book.author}
                      <p>ISBN: {book.isbn}</p>                      
                    </div>

                    <div className="button-group" style={{paddingRight:'20px'}}>
                        <button type='button' className='btn btn-primary btn-sm mx-1' onClick={() => handleViewBook(book.id)}>View book</button>
                        <button type="button" className='btn btn-secondary btn-sm mx-1' onClick={() => handleUpdate(book.id)}>Update Book</button>
                        <button type="button" className='btn btn-danger btn-sm mx-1' onClick={() => handleDelete(book.id)}>Delete Book</button>
                    </div>
                    
                    <span className="badge bg-primary rounded-pill">In stock: {book.quantity}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </>
      );      
      
}
