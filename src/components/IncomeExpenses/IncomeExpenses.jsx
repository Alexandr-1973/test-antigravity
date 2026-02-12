import Icon from '../Icon/Icon';
import styles from './IncomeExpenses.module.css';

const IncomeExpenses = ({ transactions }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return (
        <div className={styles.incomeExpenses}>
            <h2 className={styles.incomeExpensesTitle}>Income/Expenses</h2>

            <div className={styles.incomeExpensesTableWrapper}>
                <table className={styles.incomeExpensesTable}>
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
                                    <span className={`${styles.incomeExpensesType} ${transaction.type === 'income' ? styles.typeIncome : styles.typeExpense
                                        }`}>
                                        <Icon
                                            name={transaction.type === 'income' ? 'arrow-up' : 'arrow-down'}
                                            size={14}
                                        />
                                        {transaction.type}
                                    </span>
                                </td>
                                <td>
                                    <span className={styles.incomeExpensesName}>{transaction.name}</span>
                                </td>
                                <td>
                                    <span className={`${styles.incomeExpensesAmount} ${transaction.type === 'income' ? styles.amountIncome : styles.amountExpense
                                        }`}>
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
