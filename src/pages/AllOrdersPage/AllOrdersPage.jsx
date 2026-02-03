import { useState, useEffect } from 'react';
import { ordersApi } from '../../services/api';
import Filter from '../../components/Filter';
import './AllOrdersPage.css';

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
        return `status-badge status-badge--${status.toLowerCase()}`;
    };

    return (
        <div className="orders-page">
            <div className="orders-page__header">
                <Filter placeholder="User Name" onFilter={handleFilter} />
            </div>

            <div className="orders-page__content">
                <div className="orders-page__table-container">
                    <h2 className="orders-page__title">All orders</h2>

                    {isLoading ? (
                        <div className="orders-page__loading">
                            <div className="loading-spinner" />
                        </div>
                    ) : (
                        <div className="orders-page__table-wrapper">
                            <table className="orders-page__table">
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
                                            <td colSpan="6" className="orders-page__empty">
                                                No orders found
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr key={order.id}>
                                                <td>
                                                    <div className="orders-page__user">
                                                        <div className="orders-page__avatar">
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
