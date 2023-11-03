import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";
import '../../css/StudentDashboad.css'
import LoadingBar from 'react-top-loading-bar';
import favicon from '../ico/favicon.ico';
import Navbar from './Navbar';

export default function StudentDashboard() {
    const ref = useRef(null);
    const navigate = useNavigate();
    const [userId , setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [borrowedBooks, setBorrowedBooks] = useState([]); 


    useEffect(() => {
        if (loading) {
          ref.current && ref.current.continuousStart();
        } else {
          ref.current && ref.current.complete();
        }
      }, [loading]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        axios.get('http://127.0.0.1:8000/api/getAccount', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            setUser(response.data);
            setUserId(response.data.id)
            setLoading(false); 

        })
        
        .catch((error) => {
            navigate('/login');
            console.log(error);
        });

    }, [navigate]);

    useEffect(()=>{
        if(userId) {
            const token = localStorage.getItem('token');
            axios.get(`http://127.0.0.1:8000/api/getBorrowedBooks/${userId}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response)=>{
            
                if (response.data && response.data.length > 0) {
                    const bookIds = response.data.map(book => book.bookId);
                    setBorrowedBooks(bookIds);
                }
                setLoading(false);

            })
        }
    },[userId])

    useEffect(()=>{
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/books' , {
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((response)=>{
            setBooks(response.data);
            setLoading(false);

        })
    },[])

    const handleMyBorrowings = (userId) =>{
        navigate(`/myBorrowings/${userId}`);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleBorrow  = (bookId)=>{
        navigate(`/checkout/${bookId}`);
        if(!borrowedBooks.includes(bookId)) {
            setBorrowedBooks([...borrowedBooks, bookId]);
        }
    }

    if (loading) { 
        return <BeatLoader />;
    }

    const generateRows = (books) => {
        const rows = [];
        for (let i = 0; i < books.length; i += 4) {
          const rowBooks = books.slice(i, i + 4);
          rows.push(
            <div className="row" key={i}>
              {rowBooks.map((book, index) => (
                <div className='col-md-4' key={index}>
                  <div className="card fade-in">
                    <div className="card-body" style={{ textAlign: 'center', border: '1px solid black' }}>
                      <img src={`http://127.0.0.1:8000/storage/${book.coverImage}`} className="book-cover"/>
                      <h4 style={{ textAlign: 'center' }} className="card-title">{book.title}</h4>
                      <p style={{ textAlign: 'center' }} className="card-text">{book.author}</p>
                      <button style={{ justifyContent: 'center' }} className="btn btn-primary" onClick={() => handleBorrow(book.id)} disabled={borrowedBooks.includes(book.id)}>
                        {borrowedBooks.includes(book.id) ? "Borrowed" : "Borrow"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        }
        return rows;
      };
      return (
        <>
          

          <div className="sidebar" style={{borderRight:'1px solid black'}}>
            <div className="profile-section">
              <img
                src={favicon}
                alt="Profile Picture"
                className="profile-picture"
              />
              <h3 className="name">{user.name}</h3>
              <p className="email">{user.email}</p>
              <p className="role">{user.role}</p>
            </div>
            <a className="active" href="/studentDashboard">
              <i className='fa fa-home mx-2'></i>Home
            </a>
            <a onClick={()=>handleMyBorrowings(user.id)}><i className='fa fa-book mx-2'></i>My Borrowings</a>
            <a href="#contact"><i className='fa fa-filter mx-2'></i>Filters</a>
            <a onClick={handleLogout}><i className='fa fa-sign-out mx-2'></i>Logout</a>
          </div>

          <div className="content">
          <LoadingBar color="#f11946" ref={ref} />
          <Navbar title="Student Dashboard - Library Management System" />
          <h3>Browse Books</h3>
          <hr/>
            {books && generateRows(books)}
          </div>
        </>
      );
  }      