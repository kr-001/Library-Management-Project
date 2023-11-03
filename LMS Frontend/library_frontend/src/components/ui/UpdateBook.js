import React , {useEffect, useState} from 'react'
import { useParams , useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function UpdateBook() {
    const navigate = useNavigate();
    const {bookId} = useParams();
    const [book , setBook]  = useState(null);


    useEffect(()=>{
        const token = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/api/findBookById/${bookId}` , {
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response)=>{
            setBook(response.data[0]);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[bookId])

    const handleSubmit = async(event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        
        const formData = new FormData();
        formData.append('title', book.title);
        formData.append('author', book.author);
        formData.append('isbn', book.isbn); 
        formData.append('price', book.price);
        formData.append('quantity', book.quantity);
        formData.append('coverImage', book.coverImage , book.coverImage.name);
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
    
        await axios.post(`http://127.0.0.1:8000/api/updateBook/${bookId}`, formData, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        .then((response)=>{
            navigate('/adminDashboard')
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    
    

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h3>Update Book Dashboard</h3>
            <div className="container">
            <form className="border rounded p-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title:</label>
                     <input type="text" className="form-control" value={book.title} onChange={(e) => setBook({...book, title: e.target.value})} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author:</label>
                    <input type="text" className="form-control" value={book.author} onChange={(e) => setBook({...book, author:e.target.value})} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">ISBN:</label>
                    <input type="text" className="form-control" value={book.isbn} onChange={(e) => setBook({...book,isbn:e.target.value})} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price:</label>
                    <input type="number" className="form-control" value={book.price} onChange={(e) => setBook({...book , price:e.target.value})} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Quantity:</label>
                    <input type="number" className="form-control" value={book.quantity} onChange={(e) => setBook({...book, quantity:e.target.value})} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Cover Image:</label>
                    <input type="file" className="form-control-file" onChange={(e) => setBook({...book, coverImage: e.target.files[0]})} required />
                </div>
                <button type="submit"  className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    )
}
