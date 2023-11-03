import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Navbar from './Navbar';

function BookForm() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [coverImage, setCoverImage] = useState(null);

    const resetForm = () => {
        setTitle('');
        setAuthor('');
        setIsbn('');
        setPrice('');
        setQuantity('');
        setCoverImage(null);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('isbn', isbn);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('coverImage', coverImage);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/storeBook', formData , {
                headers:{
                    Authorization : `Bearer ${token}`,
                }
            });
            console.log(response.data);
            resetForm();
            navigate('/adminDashboard')
            
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
        <Navbar title = 'Add a book - LMS'/>
        <div className="container">
            <form className="border rounded p-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title:</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author:</label>
                    <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">ISBN:</label>
                    <input type="text" className="form-control" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price:</label>
                    <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Quantity:</label>
                    <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Cover Image:</label>
                    <input type="file" className="form-control" onChange={(e) => setCoverImage(e.target.files[0])} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    );
}

export default BookForm;