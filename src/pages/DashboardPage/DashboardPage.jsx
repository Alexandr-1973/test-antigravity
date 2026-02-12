import { useState, useEffect } from 'react';
import { dashboardApi } from '../../services/api';
import Statistics from '../../components/Statistics/Statistics';
import RecentCustomers from '../../components/RecentCustomers/RecentCustomers';
import IncomeExpenses from '../../components/IncomeExpenses/IncomeExpenses';
import styles from './DashboardPage.module.css';

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
            <div className={`${styles.dashboard} ${styles.dashboardLoading}`}>
                <div className={styles.loadingSpinner} />
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            <Statistics data={statistics} />

            <div className={styles.dashboardGrid}>
                <RecentCustomers customers={recentCustomers} />
                <IncomeExpenses transactions={incomeExpenses} />
            </div>
        </div>
    );
};

export default DashboardPage;
