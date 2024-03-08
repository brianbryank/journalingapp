import React, { useState, useEffect } from 'react';

const User = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone_number: '',
        role: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5555/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5555/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to add user');
            }
            setFormData({
                email: '',
                password: '',
                name: '',
                phone_number: '',
                role: ''
            });
            fetchUsers(); // Fetch users again after adding a new user
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5555/users/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            fetchUsers(); // Fetch users again after deleting a user
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleUpdate = async (id) => {
        const userToUpdate = users.find(user => user.id === id);
        const updatedFields = {
            email: userToUpdate.email,
            password: userToUpdate.password,
            name: userToUpdate.name,
            phone_number: userToUpdate.phone_number,
            role: userToUpdate.role,
            // Add any other fields you want to update here
        };
        try {
            const response = await fetch(`http://localhost:5555/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFields)
            });
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            fetchUsers(); // Fetch users again after updating a user
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                        <button onClick={() => handleUpdate(user.id)}>Update</button>
                    </li>
                ))}
            </ul>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
                </div>
                <div>
                    <label>Role:</label>
                    <select name="role" value={formData.role} onChange={handleChange} required>
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default User;
