import styles from './RecentCustomers.module.css';

const RecentCustomers = ({ customers }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return (
        <div className={styles.recentCustomers}>
            <h2 className={styles.recentCustomersTitle}>Recent Customers</h2>

            <div className={styles.recentCustomersTableWrapper}>
                <table className={styles.recentCustomersTable}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Spent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>
                                    <div className={styles.recentCustomersUser}>
                                        <div className={styles.recentCustomersAvatar}>
                                            {customer.image ? (
                                                <img src={customer.image} alt={customer.name} />
                                            ) : (
                                                customer.name.charAt(0)
                                            )}
                                        </div>
                                        <span className={styles.recentCustomersName}>{customer.name}</span>
                                    </div>
                                </td>
                                <td>
                                    <span className={styles.recentCustomersEmail}>{customer.email}</span>
                                </td>
                                <td>
                                    <span className={styles.recentCustomersAmount}>
                                        {formatCurrency(customer.spent)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentCustomers;
