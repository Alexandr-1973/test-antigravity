import { useState, useEffect } from 'react';
import { dashboardApi } from '../../services/api';
import Statistics from '../../components/Statistics';
import RecentCustomers from '../../components/RecentCustomers';
import IncomeExpenses from '../../components/IncomeExpenses';
import './DashboardPage.css';

const DashboardPage = () => {
    const [statistics, setStatistics] = useState({ products: 0, suppliers: 0, customers: 0 });
    const [recentCustomers, setRecentCustomers] = useState([]);
    const [incomeExpenses, setIncomeExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [stats, customers, transactions] = await Promise.all([
                    dashboardApi.getStatistics(),
                    dashboardApi.getRecentCustomers(5),
                    dashboardApi.getIncomeExpenses()
                ]);

                setStatistics(stats);
                setRecentCustomers(customers);
                setIncomeExpenses(transactions);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="dashboard dashboard--loading">
                <div className="loading-spinner" />
            </div>
        );
    }

    return (
        <div className="dashboard">
            <Statistics data={statistics} />

            <div className="dashboard__grid">
                <RecentCustomers customers={recentCustomers} />
                <IncomeExpenses transactions={incomeExpenses} />
            </div>
        </div>
    );
};

export default DashboardPage;
