import Icon from '../Icon';
import './IncomeExpenses.css';

const IncomeExpenses = ({ transactions }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return (
        <div className="income-expenses">
            <h2 className="income-expenses__title">Income/Expenses</h2>

            <div className="income-expenses__table-wrapper">
                <table className="income-expenses__table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>
                                    <span className={`income-expenses__type income-expenses__type--${transaction.type}`}>
                                        <Icon
                                            name={transaction.type === 'income' ? 'arrow-up' : 'arrow-down'}
                                            size={14}
                                        />
                                        {transaction.type}
                                    </span>
                                </td>
                                <td>
                                    <span className="income-expenses__name">{transaction.name}</span>
                                </td>
                                <td>
                                    <span className={`income-expenses__amount income-expenses__amount--${transaction.type}`}>
                                        {transaction.type === 'expense' ? '-' : '+'}
                                        {formatCurrency(transaction.amount)}
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

export default IncomeExpenses;
