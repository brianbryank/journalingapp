import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import User from './User';
import Home from './Home';
import Inventory from './Inventory';
import JobCards from './JobCards';
import Dashboard from './Dashboard';
import Login from './Login'; // Import the Login component
import './App.css'; // Import app.css for styling

const App = () => {
    return (
        <Router>
            <div className="container">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                        <li>
                            <Link to="/inventory">Inventory</Link>
                        </li>
                        <li>
                            <Link to="/job-cards">Job Cards</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link> {/* Add the Login link */}
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/users" element={<User />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/job-cards" element={<JobCards />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} /> {/* Add the Login route */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
