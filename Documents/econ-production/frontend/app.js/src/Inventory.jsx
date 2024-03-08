import React, { useState, useEffect } from 'react';

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [formData, setFormData] = useState({
        item_name: '',
        quantity_in_stock: '',
        supplier_name: '',
        lead_time: '',
        location: ''
    });

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const response = await fetch('http://localhost:5555/inventory');
            if (!response.ok) {
                throw new Error('Failed to fetch inventory');
            }
            const data = await response.json();
            setInventory(data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5555/inventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to add inventory item');
            }
            setFormData({
                item_name: '',
                quantity_in_stock: '',
                supplier_name: '',
                lead_time: '',
                location: ''
            });
            fetchInventory(); // Fetch inventory items again after adding a new item
        } catch (error) {
            console.error('Error adding inventory item:', error);
        }
    };

    return (
        <div>
            <h2>Inventory</h2>
            <ul>
                {inventory.map((item) => (
                    <li key={item.id}>
                        {item.item_name} - {item.quantity_in_stock}
                    </li>
                ))}
            </ul>
            <h2>Add Inventory Item</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Item Name:</label>
                    <input type="text" name="item_name" value={formData.item_name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Quantity in Stock:</label>
                    <input type="number" name="quantity_in_stock" value={formData.quantity_in_stock} onChange={handleChange} required />
                </div>
                <div>
                    <label>Supplier Name:</label>
                    <input type="text" name="supplier_name" value={formData.supplier_name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Lead Time:</label>
                    <input type="number" name="lead_time" value={formData.lead_time} onChange={handleChange} required />
                </div>
                <div>
                    <label>Location:</label>
                    <input type="number" name="location" value={formData.location} onChange={handleChange} required />
                </div>
                <button type="submit">Add Inventory Item</button>
            </form>
        </div>
    );
};

export default Inventory;
