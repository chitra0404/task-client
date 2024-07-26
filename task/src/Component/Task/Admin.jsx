import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Base_Url } from '../../config/api';
import TaskManage from './TaskManage';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'User' });
    const navigate=useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('tokenAuth');
        navigate('/');
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${Base_Url}/api/`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('tokenAuth')}`
                    }
                });
                setUsers(res.data.message);
            } catch (err) {
                console.error(err.response.data);
            }
        };

        fetchUsers();
    }, []);

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${Base_Url}/api/user`, newUser, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('tokenAuth')}`
                }
            });
            setUsers([...users, res.data]);
            setNewUser({
                name: '',
                email: '', 
                password: '',
                role: 'User' 
            });
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`${Base_Url}/api/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('tokenAuth')}`
                }
            });
            setUsers(users.filter(user => user._id !== id));
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div style={{ 
            backgroundColor: 'rgb(7, 76, 87)', 
            minHeight: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            color: '#fff',
            padding: '20px'
        }}>
            <div className='container'>
                <h2>Admin Panel</h2>
            <div className='d-flex justify-content-end mb-3'>
                    
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
                <div className='row'>
                    <div className='col-md-6 mx-auto'>
                        <h2 className=' mb-4'>Users</h2>
                        <form onSubmit={handleAddUser} className='mb-4'>
                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <select
                                    className="form-select"
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Add User</button>
                        </form>
                    </div>
                </div>
                <h2>UserDetails</h2>
                <div className='row'>
                    
                    {users.map(user => (
                        <div key={user._id} className='col-md-4 mb-4'>
                            <div className="card shadow rounded-lg" style={{ backgroundColor: '#fff', color: '#000' }}>
                                <div className="card-body">
                                    <h5 className="card-title">{user.name}</h5>
                                    <p className="card-text">{user.email}</p>
                                    <p className="card-text"><strong>Role:</strong> {user.role}</p>
                                    <button 
                                        onClick={() => handleDeleteUser(user._id)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <TaskManage/>
        </div>
    );
};

export default Admin;
