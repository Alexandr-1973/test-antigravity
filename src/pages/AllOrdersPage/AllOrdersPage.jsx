import { useState, useEffect } from 'react';
import { ordersApi } from '../../services/api';
import Filter from '../../components/Filter/Filter';
import styles from './AllOrdersPage.module.css';

const AllOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async (filterName = '') => {
        setIsLoading(true);
        try {
            const data = filterName
                ? await ordersApi.getByUserName(filterName)
                : await ordersApi.getAll();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleFilter = (name) => {
        fetchOrders(name);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusClass = (status) => {
        return `statusBadge statusBadge${status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}`;
    };

    return (
        <div className={styles.ordersPage}>
            <div className={styles.ordersPageHeader}>
                <Filter placeholder="User Name" onFilter={handleFilter} />
            </div>

            <div className={styles.ordersPageContent}>
                <div className={styles.ordersPageTableContainer}>
                    <h2 className={styles.ordersPageTitle}>All orders</h2>

                    {isLoading ? (
                        <div className={styles.ordersPageLoading}>
                            <div className="loadingSpinner" />
                        </div>
                    ) : (
                        <div className={styles.ordersPageTableWrapper}>
                            <table className={styles.ordersPageTable}>
                                <thead>
                                    <tr>
                                        <th>User Info</th>
                                        <th>Address</th>
                                        <th>Products</th>
                                        <th>Order date</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className={styles.ordersPageEmpty}>
                                                No orders found
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr key={order.id}>
                                                <td>
                                                    <div className={styles.ordersPageUser}>
                                                        <div className={styles.ordersPageAvatar}>
                                                            {order.user.name.charAt(0)}
                                                        </div>
                                                        <span>{order.user.name}</span>
                                                    </div>
                                                </td>
                                                <td>{order.address}</td>
                                                <td>{order.products}</td>
                                                <td>{formatDate(order.orderDate)}</td>
                                                <td>{formatCurrency(order.price)}</td>
                                                <td>
                                                    <span className={getStatusClass(order.status)}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllOrdersPage;
