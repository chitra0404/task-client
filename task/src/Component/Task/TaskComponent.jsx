import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Base_Url } from '../../config/api';

const TaskComponent = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get(`${Base_Url}/api/get`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('tokenAuth')}`
                    }
                });
                console.log(res.data)
                setTasks(res.data.message);
            } catch (err) {
                console.error(err.response.data);
            }
        };

        fetchTasks();
    }, []);

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${Base_Url}/api/create`, 
                { title, description }, 
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('tokenAuth')}`
                    }
                }
            );
            setTasks([...tasks, res.data.task]);
            setTitle('');
            setDescription('');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">My Tasks</h2>
            <form onSubmit={handleAddTask} className="d-flex flex-column align-items-center">
                <div className="form-group w-50">
                    <label>Task Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group w-50 mt-3">
                    <label>Task Description</label>
                    <input
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-4">Add Task</button>
            </form>
            <p>Task Details:</p>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>{task.title} - {task.description} - {task.status}</li>
                ))}
            </ul>
        </div>
    );
};

export default TaskComponent;
