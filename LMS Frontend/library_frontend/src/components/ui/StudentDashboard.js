import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import BeatLoader from "react-spinners/BeatLoader";
import '../../css/StudentDashboad.css'
import LoadingBar from 'react-top-loading-bar';


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
                      <img src={`http://127.0.0.1:8000/storage/${book.coverImage}`} className="book-cover" style={{ justifyItems: 'center' }} />
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
          <LoadingBar color='#f11946' ref={ref} />
          <Navbar title='Student Dashboard - LMS' />
      
          <div className="container mt-4">
            <div className="row">
              {user && (
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-header">
                      User Information
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{user.name}</h5>
                      <p className="card-text"><strong>Email:</strong> {user.role}</p>
                      <button className="btn btn-success mt-3" onClick={() => handleMyBorrowings(user.id)}>
                        My Borrowings
                      </button>
                      <button className="btn btn-warning mt-3 ml-2 mx-2" onClick={handleLogout}>
                        Logout
                      </button> 
                    </div>
                  </div>
                </div>
              )}
              <div className="col-md-9">

                <h3>Available Books</h3>
                {books && generateRows(books)}
              </div>
            </div>
          </div>
        </>
      );
  }      