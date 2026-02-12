import Icon from '../Icon/Icon';
import styles from './Statistics.module.css';

const Statistics = ({ data }) => {
    const stats = [
        {
            key: 'products',
            icon: 'products',
            label: 'All products',
            value: data.products,
            color: 'green'
        },
        {
            key: 'suppliers',
            icon: 'suppliers',
            label: 'All suppliers',
            value: data.suppliers,
            color: 'blue'
        },
        {
            key: 'customers',
            icon: 'customers',
            label: 'All customers',
            value: data.customers,
            color: 'orange'
        }
    ];

    return (
        <div className={styles.statistics}>
            {stats.map(({ key, icon, label, value, color }) => (
                <div
                    key={key}
                    className={`${styles.statisticsCard} ${color === 'green' ? styles.cardGreen :
                        color === 'blue' ? styles.cardBlue :
                            styles.cardOrange
                        }`}
                >
                    <div className={styles.statisticsIcon}>
                        <Icon name={icon} size={20} />
                    </div>
                    <div className={styles.statisticsContent}>
                        <span className={styles.statisticsValue}>{value}</span>
                        <span className={styles.statisticsLabel}>{label}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Statistics;
