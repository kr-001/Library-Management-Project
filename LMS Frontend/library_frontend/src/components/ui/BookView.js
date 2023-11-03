import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

export default function BookView() {
    const {bookId} = useParams();
    const [borrower, setBorrower] = useState([]);
    const [book , setBook] = useState(null);
    const token = localStorage.getItem('token');
   useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/findBookById/${bookId}` , {
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
    .then((response)=>{
        setBook(response.data[0])
        console.log(response.data);
    })
   }, [])

   useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/getBorrowers/${bookId}` , {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response)=>{
        setBorrower(response.data);
       
    })
   },[])
   console.log(borrower);
    

  return (
   <>
    <Navbar title='Library Management System'/>
    <div className='container'>
        <div className='row'>
            {book && (
                <>
                <div className='col-md-4' key={book.id} style={{padding: '20px'}}>
                <img src={`http://127.0.0.1:8000/storage/${book.coverImage}`} className="bookImage" alt={book.title} style={{padding: '2px', maxHeight: '500px', maxWidth : '500px' , border: '1px solid black'}} />
                </div>
                <div className='col-md-8' key={book.isbn} style={{padding : '20px'}}>
                    <h1><b>{book.title}</b></h1>
                    <p>by <em>{book.author}</em></p>
                    <hr/>
                    <h3>Book Details</h3>
                    <ul className='list-group'>
                        <li className='list-group-item'>ISBN:- <b>{book.isbn}</b></li>
                        <li className='list-group-item'>Stock Quantity:- <b>{book.quantity}</b></li>
                        <li className='list-group-item'>Price Per Book:- <b>{book.price}</b></li>
                    </ul>
                    <hr/>
                    <h3>Borrowers of book</h3>
                    {borrower ? (
                        borrower.map((obj) => (
                     <div className='card' style={{width: '18rem' , display: 'flex' , flexDirection:'column' , alignItems: 'start'}}>
                        <div className='card-body'>
                            <h5 className='card-title'>{obj.borrower_name}</h5>
                             <div style={{display: 'flex' ,justifyContent:'space-between'  , width:'100%'}}>
                             <h6 class="card-subtitle mb-2 text-body-secondary">Issued On: {new Date(obj.issue_date).toLocaleDateString('en-GB')}</h6>
                             <h6 class="card-subtitle mb-2 text-body-secondary">Return Date: {new Date(obj.return_date).toLocaleDateString('en-GB')}</h6>
                             </div>
                        </div>
                     </div>
                    ))
                    ) : (
                    <p>Loading...</p>
                    )}

                </div>
                </>
            )}
        </div>
    </div>
   </>
  )
}
