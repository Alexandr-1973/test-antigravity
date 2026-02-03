import { useState, useEffect } from 'react';
import { customersApi } from '../../services/api';
import Filter from '../../components/Filter';
import Pagination from '../../components/Pagination';
import './CustomersDataPage.css';

const CustomersDataPage = () => {
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filterName, setFilterName] = useState('');
    const itemsPerPage = 5;

    const fetchCustomers = async (name = '', page = 1) => {
        setIsLoading(true);
        try {
            const result = name
                ? await customersApi.getByName(name, page, itemsPerPage)
                : await customersApi.getAll(page, itemsPerPage);

            setCustomers(result.data);
            setTotalPages(result.totalPages);
            setCurrentPage(result.page);
        } catch (error) {
            console.error('Failed to fetch customers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers(filterName, currentPage);
    }, [currentPage]);

    const handleFilter = (name) => {
        setFilterName(name);
        setCurrentPage(1);
        fetchCustomers(name, 1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchCustomers(filterName, page);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="customers-page">
            <div className="customers-page__header">
                <Filter placeholder="User Name" onFilter={handleFilter} />
            </div>

            <div className="customers-page__content">
                <div className="customers-page__table-container">
                    <h2 className="customers-page__title">Customers Data</h2>

                    {isLoading ? (
                        <div className="customers-page__loading">
                            <div className="loading-spinner" />
                        </div>
                    ) : (
                        <>
                            <div className="customers-page__table-wrapper">
                                <table className="customers-page__table">
                                    <thead>
                                        <tr>
                                            <th>User Info</th>
                                            <th>Email</th>
                                            <th>Address</th>
                                            <th>Phone</th>
                                            <th>Register date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="customers-page__empty">
                                                    No customers found
                                                </td>
                                            </tr>
                                        ) : (
                                            customers.map((customer) => (
                                                <tr key={customer.id}>
                                                    <td>
                                                        <div className="customers-page__user">
                                                            <div className="customers-page__avatar">
                                                                {customer.name.charAt(0)}
                                                            </div>
                                                            <span>{customer.name}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="customers-page__email">{customer.email}</span>
                                                    </td>
                                                    <td>{customer.address}</td>
                                                    <td>{customer.phone}</td>
                                                    <td>{formatDate(customer.registerDate)}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomersDataPage;
