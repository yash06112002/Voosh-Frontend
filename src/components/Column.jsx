import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';
import '../styles/Dashboard.css';

const Column = ({ column, tasks, onTaskDrop, onDelete }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: (item) => {
            onTaskDrop(item._id, column);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div ref={drop} className='task-column'>
            <h3>{column}</h3>
            {tasks.map((task) => (
                <TaskCard key={task._id} task={task} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default Column;
