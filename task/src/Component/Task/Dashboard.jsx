import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Base_Url } from '../../config/api';
import TaskComponent from './TaskComponent';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [activeUserCount, setActiveUserCount] = useState(0);
    const [totalTaskCount, setTotalTaskCount] = useState(0);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('tokenAuth');
        navigate('/');
    };

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const res = await axios.get(`${Base_Url}/api/dashboard`,{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('tokenAuth')}`
                    }
                });
                setActiveUserCount(res.data.activeUserCount);
                setTotalTaskCount(res.data.totalTaskCount);
            } catch (err) {
                console.error(err.response.data);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div style={{ 
            backgroundColor: 'rgb(7, 76, 87)', 
            minHeight: '100vh',
            width:'100vw', 
            display: 'flex', 
            flexDirection: 'column',
            color: '#fff'
        }}>
            <div className='container' style={{ flex: 1, paddingTop: '20px' }}>
            <h2>Dashboard:</h2>
                <div className='d-flex justify-content-end mb-3'>
                    
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
                <div className='row justify-content-center'>
                    <div className="col-md-4 mb-4">
                        <div className="card shadow rounded-lg">
                            <div className="card-body text-center">
                                <strong className='text-dark'>Active Users:</strong>
                                <span className='text-dark'> {activeUserCount}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card shadow rounded-lg">
                            <div className="card-body text-center">
                                <strong className='text-dark'>Total Tasks:</strong>
                                <span className='text-dark'> {totalTaskCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mt-4' style={{ flex: 1 }}>
                <TaskComponent />
            </div>
        </div>
    );
};

export default Dashboard;
