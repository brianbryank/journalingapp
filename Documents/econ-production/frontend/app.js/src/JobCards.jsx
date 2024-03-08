import React, { useState, useEffect } from 'react';

const JobCards = () => {
    const [jobCards, setJobCards] = useState([]);
    const [formData, setFormData] = useState({
        job_type: '',
        job_description: '',
        order_of_products: '',
        order_date: '',
        end_of_production: '',
        urgency: ''
    });

    useEffect(() => {
        fetchJobCards();
    }, []);

    const fetchJobCards = async () => {
        try {
            const response = await fetch('http://localhost:5555/job-cards');
            if (!response.ok) {
                throw new Error('Failed to fetch job cards');
            }
            const data = await response.json();
            setJobCards(data);
        } catch (error) {
            console.error('Error fetching job cards:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5555/job-cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to add job card');
            }
            setFormData({
                job_type: '',
                job_description: '',
                order_of_products: '',
                order_date: '',
                end_of_production: '',
                urgency: ''
            });
            fetchJobCards(); // Fetch job cards again after adding a new card
        } catch (error) {
            console.error('Error adding job card:', error);
        }
    };

    return (
        <div>
            <h2>Job Cards</h2>
            <ul>
                {jobCards.map((card) => (
                    <li key={card.id}>
                        {card.job_type} - {card.order_date}
                    </li>
                ))}
            </ul>
            <h2>Add Job Card</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Job Type:</label>
                    <input type="text" name="job_type" value={formData.job_type} onChange={handleChange} required />
                </div>
                <div>
                    <label>Job Description:</label>
                    <textarea name="job_description" value={formData.job_description} onChange={handleChange} required />
                </div>
                {/* Add other input fields for job card data */}
                <button type="submit">Add Job Card</button>
            </form>
        </div>
    );
};

export default JobCards;
