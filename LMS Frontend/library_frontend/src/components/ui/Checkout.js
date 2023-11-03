import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams , useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function Checkout() {
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [borrowerData, setBorrowerData] = useState({
    bookId: '',
    borrower_id: '',
    borrower_name: '',
    borrower_contact: '',
  });

  const { bookId } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/findBookById/${bookId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setBook(response.data[0]);
        setUser(response.data[1]);
        setBorrowerData({
          bookId: response.data[0].id,
          borrower_id: response.data[1].id,
          borrower_name: response.data[1].name,
          borrower_contact: '',
        });
      });
      
  }, [bookId]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBorrowerData({
      ...borrowerData,
      [name]: value,
    });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };

    axios.post('http://127.0.0.1:8000/api/checkoutPage', borrowerData, {headers})
      .then((response) => {
        if(response.status === 200){
          setMessage('Borrow Order Created Successfully!');
          setTimeout(200);
          navigate('/studentDashboard');
        }
        if(response.status === 201){
          setMessage('Book already borrowed by this user.');
        }
     
      })
      .catch((error) => {
        setMessage('Some Error Occured');
        console.error('Error creating order:', error);
      });
  };

  return (
    <>
      <Navbar title='Checkout Page - LMS' />
      <div className='container'>
      {message && (
        <div className='alert alert-warning alert-dismissible fade show'>
        <p>{message}</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
        <div className="row" style={{textAlign: "center"}}>
          <h2>Fill Your Details</h2>
          <hr />
        </div>
        {book && user && (
          <form onSubmit={handleOrderSubmit}>
            <div className="row my-4">
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor='bookId'>Book ISBN:</label>
                  <input type="text" className="form-control" id='bookId' name="bookId" value={borrowerData.bookId} readOnly />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor='borrower_id'>Your ID:</label>
                  <input type="text" className="form-control" id='borrower_id' name="borrower_id" value={borrowerData.borrower_id} readOnly />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor='borrower_name'>Your Name:</label>
                  <input type="text" className="form-control" id='borrower_name' name="borrower_name" value={borrowerData.borrower_name} readOnly />
                </div>
              </div>
            </div>
            <div className="row my-4">
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor='borrower_contact'>Contact Number:</label>
                  <input type="text" className="form-control" id='borrower_contact' name="borrower_contact" value={borrowerData.borrower_contact} onChange={handleInputChange} required />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        )}
      </div>
    </>
  );
}
