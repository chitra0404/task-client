import { useState } from 'react'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import Dashboard from './Component/Task/Dashboard'
import Admin from './Component/Task/Admin'
import TaskComponent from './Component/Task/TaskComponent'
import Register from './Component/AuthComponent/Register'
import Login from './Component/AuthComponent/Login'

function App() {

  return (
    <>
     <Router>
      <Routes>
      <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/task" element={<TaskComponent />} />
      </Routes>
     </Router>
    </>
  )
}

export default App
