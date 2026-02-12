import { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Icon from '../Icon/Icon';
import styles from './Sidebar.module.css';

const navItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/orders', icon: 'orders', label: 'Orders' },
    { path: '/products', icon: 'products', label: 'Products' },
    { path: '/customers', icon: 'customers', label: 'Customers' },
    { path: '/suppliers', icon: 'suppliers', label: 'Suppliers' },
];

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    // Close sidebar on route change (mobile)
    useEffect(() => {
        onClose?.();
    }, [location.pathname]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose?.();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    return (
        <>
            {/* Overlay for mobile/tablet */}
            <div
                className={`${styles.sidebarOverlay} ${isOpen ? styles.sidebarOverlayOpen : ''}`}
                onClick={onClose}
                aria-hidden="true"
            />

            <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
                {/* Mobile/Tablet strip layout */}
                <div className={styles.sidebarMobileStrip}>
                    <button
                        className={styles.sidebarClose}
                        onClick={onClose}
                        aria-label="Close menu"
                    >
                        <Icon name="close" size={24} />
                    </button>

                    <nav className={styles.sidebarMenuMobile}>
                        {navItems.map(({ path, icon, label }) => (
                            <NavLink
                                key={path}
                                to={path}
                                className={({ isActive }) =>
                                    `${styles.sidebarLinkMobile} ${isActive ? styles.sidebarLinkMobileActive : ''}`
                                }
                                title={label}
                            >
                                <Icon name={icon} size={20} />
                            </NavLink>
                        ))}
                    </nav>

                    <button
                        className={styles.sidebarLogoutMobile}
                        onClick={handleLogout}
                        title="Log out"
                    >
                        <Icon name="logout" size={20} />
                    </button>
                </div>

                {/* Desktop layout */}
                <nav className={styles.sidebarNavDesktop}>
                    <ul className={styles.sidebarMenu}>
                        {navItems.map(({ path, icon, label }) => (
                            <li key={path} className={styles.sidebarItem}>
                                <NavLink
                                    to={path}
                                    className={({ isActive }) =>
                                        `${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ''}`
                                    }
                                    title={label}
                                >
                                    <Icon name={icon} size={20} />
                                    <span className={styles.sidebarLabel}>{label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
