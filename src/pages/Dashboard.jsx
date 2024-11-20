import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Column from '../components/Column';
import Auth from '../context/Auth';
import '../styles/Dashboard.css';

const DashboardPage = () => {
    const [tasks, setTasks] = useState([]);
    const columns = ['To Do', 'In Progress', 'Done'];
    const { user, logout } = useContext(Auth);
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    const handleSignout = () => logout();

    useEffect(() => {
        const fetchTasks = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`, {
                headers: { Authorization: token },
            });
            setTasks(data);
        };
        fetchTasks();
    }, []);

    const handleTaskDrop = async (taskId, newColumn) => {
        try {

            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`,
                { column: newColumn },
                { headers: { Authorization: token } }
            );
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === taskId ? { ...task, column: newColumn } : task
                )
            );
        } catch (error) {
            console.error('Error updating task:', error.response?.data || error.message);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`, {
                headers: { Authorization: token },
            });
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } catch (err) {
            console.error('Error deleting task:', err.response?.data || err.message);
        }
    };

    return (
        <div className='dashboard-container'>
            <div style={{ padding: '2rem' }} className='dashboard-header'>
                <h1>Welcome, {user?.name}</h1>
                <button
                    onClick={() => navigate('/create-task')}
                >
                    Create New Task
                </button>
                <button
                    onClick={handleSignout}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#ff4d4f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Sign Out
                </button>
            </div>
            <div style={{ display: 'flex', padding: '2rem' }} className='task-columns'>
                {columns.map((column) => (
                    <Column
                        key={column}
                        column={column}
                        tasks={tasks.filter((task) => task.column === column)}
                        onTaskDrop={handleTaskDrop}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;
