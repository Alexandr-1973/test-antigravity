import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import styles from './Logo.module.css';

const Logo = ({ size = 'medium' }) => {
    return (
        <Link to="/dashboard" className={`${styles.logo} ${styles[`logo${size.charAt(0).toUpperCase() + size.slice(1)}`]}`} aria-label="Medicine Store - Go to dashboard">
            <span className={styles.logoIcon}>
                <Icon name="logo" size={size === 'large' ? 44 : 40} />
            </span>
        </Link>
    );
};

export default Logo;
