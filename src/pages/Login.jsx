import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/Auth';
import axios from 'axios';
import '../styles/Auth.css';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, { email, password });
            login(data);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleLogin} className="auth-card">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
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
                    Don't have an account? <Link to="/signup">Signup</Link>
                </p>
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                >
                    Login with Google
                </button>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
