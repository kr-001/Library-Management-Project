import React,{useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

export default function MyBorrowings() {
    const [books, setBooks] = useState([]);
    const { userId } = useParams();
  
    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/myBorrowings/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => {
          setBooks(response.data);
        });
        
    }, [userId]);
  
    return (
      <>
        <div class="sidebar">

            <a class="active" href="/studentDashboard">
              <i className='fa fa-home mx-2'></i>Dashboard
            </a>
            <a href="#contact"><i className='fa fa-filter mx-2'></i>Filters</a>
            <a href="#about"><i className='fa fa-sign-out mx-2'></i>Logout</a>
          </div>
        <div className='content'>
          <div className="row" style={{textAlign: "center"}}>
            <h2>Your Borrowed Books</h2>
            <hr />
          </div>
          {books.map((book, index) => (
  <div key={index} className="card" style={{ width: "18rem" }}>
    <img src={`http://127.0.0.1:8000/storage/${book.book.coverImage}`} className="card-img-top" alt={book.book.title} />
    <div className="card-body">
      <h5 className="card-title">{book.book.title}</h5>
      <p className="card-text">{book.book.author}</p>
      <p className="card-text">Issue Date: <b style={{ color: 'red' }}>{new Date(book.issue_date).toLocaleDateString('en-GB')}</b></p>
      <p className="card-text">Return Date: <b style={{ color: 'green' }}>{new Date(book.return_date).toLocaleDateString('en-GB')}</b></p>
      <p className="card-text">
        Dew In: <b style={{ color: 'green' }}>
          {Math.floor((new Date(book.return_date.split(" ")[0]) - new Date(book.issue_date.split(" ")[0])) / (1000 * 60 * 60 * 24))} days
        </b>
      </p>
    </div>
  </div>
))}



        </div>
      </>
    );
  }
  
