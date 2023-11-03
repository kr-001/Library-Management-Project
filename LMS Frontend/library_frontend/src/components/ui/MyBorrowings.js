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
          console.log(response.data);
          setBooks(response.data);
        });
        
    }, [userId]);
  
    return (
      <>
        <Navbar title='Library Management System' />
        <div className='container'>
          <div className="row" style={{textAlign: "center"}}>
            <h2>Your Borrowed Books</h2>
            <hr />
          </div>
          {books.map((book, index) => (
         <div key={index} className="card" style={{width: "18rem"}}>
        <div className="card-body" style={{textAlign:'center'}}>
        <img src={`http://127.0.0.1:8000/storage/${book.book.coverImage}`} className="book-cover" style={{ justifyItems: 'center' }}/>
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">{book.author}</p>
        <p className="card-text" >Issue Date: <b style={{color:'red'}}>{book.issue_date.split(" ")[0]}</b></p>
        <p className="card-text" >Return Date: <b style={{color:'green'}}>{book.return_date.split(" ")[0]}</b></p>
        <p className="card-text">
        Dew In: <b style={{color:'green'}}>
    {Math.floor((new Date(book.return_date.split(" ")[0]) - new Date(book.issue_date.split(" ")[0])) / (1000 * 60 * 60 * 24))} 
         days</b>
        </p>
        </div>
  </div>
))}


        </div>
      </>
    );
  }
  
