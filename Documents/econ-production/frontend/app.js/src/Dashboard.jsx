import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    // State to hold dashboard data
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        // Fetch dashboard data when component mounts
        fetchDashboardData();
    }, []);

    // Function to fetch dashboard data
    const fetchDashboardData = async () => {
        try {
            // Fetch data from API endpoint
            const response = await fetch('http://localhost:5555/dashboard');
            if (!response.ok) {
                throw new Error('Failed to fetch dashboard data');
            }
            // Parse response data
            const data = await response.json();
            // Set dashboard data in state
            setDashboardData(data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    // Render loading message if data is not yet fetched
    if (!dashboardData) {
        return <div>Loading dashboard...</div>;
    }

    // Render dashboard data
    return (
        <div>
            <h2>Dashboard</h2>
            {/* Render different components or data here */}
        </div>
    );
};

export default Dashboard;
