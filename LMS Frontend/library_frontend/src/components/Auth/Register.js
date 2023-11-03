import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../ui/Navbar';
import axios from 'axios';
export default function RegisterForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
    });
    const [message , setMessage] = useState('');
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        console.log(formData);
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/register' , formData)
        .then((response)=>{
            setMessage('Successfully Registered!');
            navigate('/login');
        })
        .catch((error)=>{
            setMessage('Error Occured, Try Again');
            navigate('/register');
        })
       
    };

    return (
        <>
        <Navbar title = 'User Registraion- LMS'/>
        <div className="container">
        {message && <div className="alert alert-info">{message}</div>}
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password_confirmation">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Select Role:</label>
                    <select
                        className="form-select"
                        aria-label="Select Role"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select Role</option>
                        <option value="Student">Student</option>
                        <option value="Librarian">Librarian</option>
                    </select>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
        </>
    );
    
}
