import React from 'react';
import { useDrag } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import '../styles/TaskCard.css';

const TaskCard = ({ task, onDelete }) => {
    const navigate = useNavigate();
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TASK',
        item: { _id: task._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} className='task-card'>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <button onClick={() => navigate(`/view-task/${task._id}`)}>
                View
            </button>
            <button onClick={() => navigate(`/edit-task/${task._id}`)}>
                Edit
            </button>
            <button onClick={() => onDelete(task._id)}>
                Delete
            </button>
        </div>
    );
};

export default TaskCard;
