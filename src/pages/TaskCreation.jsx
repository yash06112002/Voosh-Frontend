import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/TaskCreation.css';

const TaskCreationPage = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [column, setColumn] = useState('To Do');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/tasks`,
                { title, description, column },
                { headers: { Authorization: token } }
            );
            navigate('/dashboard');
        } catch (err) {
            setError('Error creating task. Please try again.');
        }
    };

    return (
        <div className="task-creation-container">
            <h1>Create a New Task</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    value={column}
                    onChange={(e) => setColumn(e.target.value)}
                    required
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
                <button type="submit">Create Task</button>
                <button
                    type="button"
                    className="cancel-button"
                    onClick={() => navigate('/dashboard')}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default TaskCreationPage;
