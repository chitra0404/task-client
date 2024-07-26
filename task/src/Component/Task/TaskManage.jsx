import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Base_Url } from '../../config/api';

const TaskManage = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get(`${Base_Url}/api/alltask`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('tokenAuth')}`
                    }
                });
                setTasks(res.data.message);
            } catch (err) {
                console.error(err.response.data);
            }
        };

        fetchTasks();
    }, []);

    const handleApproveTask = async (taskId) => {
        try {
            const res = await axios.put(`${Base_Url}/api/approve/${taskId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('tokenAuth')}`
                }
            });
            setTasks(tasks.map(task => (task._id === taskId ? res.data : task)));
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="container" style={{ marginTop: '20px' }}>
            <h2>Manage Tasks</h2>
            <div className="row">
                {tasks.map(task => (
                    <div key={task._id} className="col-md-4 mb-4">
                        <div className="card shadow rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                            <div className="card-body">
                                <h5 className="card-title" style={{ color: '#343a40' }}>{task.title}</h5>
                                <p className="card-text" style={{ color: '#343a40' }}>{task.description}</p>
                                <p className="card-text" style={{ color: '#343a40' }}><strong>Status:</strong> {task.status}</p>
                                {task.status !== 'Approved' && (
                                    <button 
                                        onClick={() => handleApproveTask(task._id)}
                                        className="btn btn-primary"
                                        style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                                    >
                                        Approve
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskManage;
