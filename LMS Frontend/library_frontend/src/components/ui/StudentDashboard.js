import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function StudentDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Set the token in the state
        const token = localStorage.getItem('token');
        
        // Make the Axios request with the token
        axios.get('http://127.0.0.1:8000/api/getAccount', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            navigate('/login');
            console.log(error);
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <h2>Student Dashboard</h2>
            {user && (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.role}</p>
                    {/* Add more user details here */}
                </div>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
