import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import {useNavigate} from "react-router-dom";
import axios from 'axios'

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
    console.log(books);

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
    <Navbar title = 'Admin Dashboard - Library Management System'/>
        <div className='container'>
            
            {user && (
                <div className='row-cols-1' style={{padding: '20px'}}>
                    <h3>Welcome, {user.name}</h3>
                    <p>Role: <strong>{user.role}</strong></p>
                    <p>Email: <strong>{user.email}</strong></p>
                </div>
                
            )}
            <div className='row'>
                <div className='col'>
                    <button type="button" className='btn btn-primary' onClick={handleSubmit}>Add Book</button>
                    <button type="button" className='btn btn-secondary' onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <hr/>
            <h3>Available Books:</h3>
            <hr/>
            {books && books.map((book)=>(
            <div key={book.id} className='card' style={{width: '18rem'}}>
            <img src={`http://127.0.0.1:8000/storage/${book.coverImage}`} className="card-img-top" alt={book.title} />
            <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.description}</p>
                <button type='button' className='btn btn-primary' onClick={()=>handleViewBook(book.id)}>View book</button>
                <button type="button" className='btn btn-secondary' onClick={() => handleUpdate(book.id)}>Update Book</button>
                <button type="button" className='btn btn-danger' onClick={() => handleDelete(book.id)}>Delete Book</button>
            </div>
        </div>
        ))}


        </div>

    </>
  )
}
