import Icon from '../Icon';
import './Statistics.css';

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
        <div className="statistics">
            {stats.map(({ key, icon, label, value, color }) => (
                <div key={key} className={`statistics__card statistics__card--${color}`}>
                    <div className="statistics__icon">
                        <Icon name={icon} size={20} />
                    </div>
                    <div className="statistics__content">
                        <span className="statistics__value">{value}</span>
                        <span className="statistics__label">{label}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Statistics;
