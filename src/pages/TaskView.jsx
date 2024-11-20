import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/TaskViewEdit.css';

const TaskViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
                    headers: { Authorization: token },
                });
                setTask(data);
            } catch (err) {
                console.error('Error fetching task:', err.response?.data || err.message);
            }
        };

        fetchTask();
    }, [id]);

    if (!task) return <p>Loading...</p>;

    return (
        <div className='task-page-container'>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <p>
                <strong>Column:</strong> {task.column}
            </p>
            <button
                onClick={() => navigate('/dashboard')}
            >
                Back to Dashboard
            </button>
        </div>
    );
};

export default TaskViewPage;
