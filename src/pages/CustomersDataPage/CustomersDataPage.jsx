import { useState, useEffect } from 'react';
import { customersApi } from '../../services/api';
import Filter from '../../components/Filter/Filter';
import Pagination from '../../components/Pagination/Pagination';
import styles from './CustomersDataPage.module.css';

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
        <div className={styles.customersPage}>
            <div className={styles.customersPageHeader}>
                <Filter placeholder="User Name" onFilter={handleFilter} />
            </div>

            <div className={styles.customersPageContent}>
                <div className={styles.customersPageTableContainer}>
                    <h2 className={styles.customersPageTitle}>Customers Data</h2>

                    {isLoading ? (
                        <div className={styles.customersPageLoading}>
                            <div className="loadingSpinner" />
                        </div>
                    ) : (
                        <>
                            <div className={styles.customersPageTableWrapper}>
                                <table className={styles.customersPageTable}>
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
                                                <td colSpan="5" className={styles.customersPageEmpty}>
                                                    No customers found
                                                </td>
                                            </tr>
                                        ) : (
                                            customers.map((customer) => (
                                                <tr key={customer.id}>
                                                    <td>
                                                        <div className={styles.customersPageUser}>
                                                            <div className={styles.customersPageAvatar}>
                                                                {customer.name.charAt(0)}
                                                            </div>
                                                            <span>{customer.name}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className={styles.customersPageEmail}>{customer.email}</span>
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
