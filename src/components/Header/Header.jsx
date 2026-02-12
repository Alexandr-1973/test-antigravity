import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../Logo/Logo';
import Icon from '../Icon/Icon';
import styles from './Header.module.css';

const Header = ({ onMenuClick }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <button
                    className={styles.headerBurger}
                    onClick={onMenuClick}
                    type="button"
                    aria-label="Open menu"
                >
                    <Icon name="burger" size={24} />
                </button>
                <Logo />
                <div className={styles.headerTitleGroup}>
                    <h1 className={styles.headerTitle}>Medicine Store</h1>
                    <nav className={styles.headerNav}>
                        <Link to="/dashboard" className={`${styles.headerSubtitle} ${styles.headerSubtitleLink}`}>
                            Dashboard
                        </Link>
                        <span className={styles.headerSeparator}>|</span>
                        <span className={styles.headerSubtitle}>{user?.email || 'vendor@gmail.com'}</span>
                    </nav>
                </div>
            </div>
            <button className={styles.headerLogout} onClick={handleLogout} type="button">
                <Icon name="logout" size={16} />
                <span>Log out</span>
            </button>
        </header>
    );
};

export default Header;
