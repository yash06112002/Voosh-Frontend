import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleSuccessPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            localStorage.setItem('authToken', token);
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    }, [navigate]);

    return <p>Logging in...</p>;
};

export default GoogleSuccessPage;
