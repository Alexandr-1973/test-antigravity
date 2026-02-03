import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../Logo';
import Icon from '../Icon';
import './Header.css';

const Header = ({ onMenuClick }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <header className="header">
            <div className="header__left">
                <button
                    className="header__burger"
                    onClick={onMenuClick}
                    type="button"
                    aria-label="Open menu"
                >
                    <Icon name="burger" size={24} />
                </button>
                <Logo />
                <div className="header__title-group">
                    <h1 className="header__title">Medicine Store</h1>
                    <nav className="header__nav">
                        <Link to="/dashboard" className="header__subtitle header__subtitle--link">
                            Dashboard
                        </Link>
                        <span className="header__separator">|</span>
                        <span className="header__subtitle">{user?.email || 'vendor@gmail.com'}</span>
                    </nav>
                </div>
            </div>
            <button className="header__logout" onClick={handleLogout} type="button">
                <Icon name="logout" size={16} />
                <span>Log out</span>
            </button>
        </header>
    );
};

export default Header;
