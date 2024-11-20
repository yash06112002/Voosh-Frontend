import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('${import.meta.env.VITE_API_URL}/api/users/register', {
                name,
                email,
                password,
            });
            setError('');
            setSuccess('Signup successful! You can now log in.');
            setName('');
            setEmail('');
            setPassword('');
        } catch (err) {
            setSuccess('');
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSignup} className="auth-card">
                <h2>Signup</h2>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default SignupPage;
