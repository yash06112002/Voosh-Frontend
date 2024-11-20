import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/TaskViewEdit.css';

const TaskEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [column, setColumn] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
                    headers: { Authorization: token },
                });
                setTask(data);
                setTitle(data.title);
                setDescription(data.description);
                setColumn(data.column);
            } catch (err) {
                setError('Error fetching task details');
            }
        };

        fetchTask();
    }, [id]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
                { title, description, column },
                { headers: { Authorization: token } }
            );
            navigate('/dashboard');
        } catch (err) {
            setError('Error saving task updates');
        }
    };

    if (!task) return <p>Loading...</p>;

    return (
        <div className='task-page-container'>
            <h1>Edit Task</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSave}>
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
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
                <button
                    type="submit"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default TaskEditPage;
