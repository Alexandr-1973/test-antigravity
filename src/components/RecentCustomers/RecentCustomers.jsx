import './RecentCustomers.css';

const RecentCustomers = ({ customers }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return (
        <div className="recent-customers">
            <h2 className="recent-customers__title">Recent Customers</h2>

            <div className="recent-customers__table-wrapper">
                <table className="recent-customers__table">
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
                                    <div className="recent-customers__user">
                                        <div className="recent-customers__avatar">
                                            {customer.image ? (
                                                <img src={customer.image} alt={customer.name} />
                                            ) : (
                                                customer.name.charAt(0)
                                            )}
                                        </div>
                                        <span className="recent-customers__name">{customer.name}</span>
                                    </div>
                                </td>
                                <td>
                                    <span className="recent-customers__email">{customer.email}</span>
                                </td>
                                <td>
                                    <span className="recent-customers__amount">
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
