import { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Icon from '../Icon';
import './Sidebar.css';

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
                className={`sidebar-overlay ${isOpen ? 'sidebar-overlay--open' : ''}`}
                onClick={onClose}
                aria-hidden="true"
            />

            <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
                {/* Mobile/Tablet strip layout */}
                <div className="sidebar__mobile-strip">
                    <button
                        className="sidebar__close"
                        onClick={onClose}
                        aria-label="Close menu"
                    >
                        <Icon name="close" size={24} />
                    </button>

                    <nav className="sidebar__menu-mobile">
                        {navItems.map(({ path, icon, label }) => (
                            <NavLink
                                key={path}
                                to={path}
                                className={({ isActive }) =>
                                    `sidebar__link-mobile ${isActive ? 'sidebar__link-mobile--active' : ''}`
                                }
                                title={label}
                            >
                                <Icon name={icon} size={20} />
                            </NavLink>
                        ))}
                    </nav>

                    <button
                        className="sidebar__logout-mobile"
                        onClick={handleLogout}
                        title="Log out"
                    >
                        {/* Logout icon rotated to match mockup style if needed, but standard is fine */}
                        <Icon name="logout" size={20} />
                    </button>
                </div>

                {/* Desktop layout */}
                <nav className="sidebar__nav-desktop">
                    <ul className="sidebar__menu">
                        {navItems.map(({ path, icon, label }) => (
                            <li key={path} className="sidebar__item">
                                <NavLink
                                    to={path}
                                    className={({ isActive }) =>
                                        `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                                    }
                                    title={label}
                                >
                                    <Icon name={icon} size={20} />
                                    <span className="sidebar__label">{label}</span>
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
