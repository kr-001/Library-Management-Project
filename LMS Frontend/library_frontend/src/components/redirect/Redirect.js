import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Redirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role === 'Student') {
            navigate('/studentDashboard');
        } else {
            navigate('/adminDashboard');
        }
    }, [navigate]);

    return (
        <div>
            <h3>Loading...</h3>
        </div>
    );
}
