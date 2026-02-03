import { Link } from 'react-router-dom';
import Icon from '../Icon';
import './Logo.css';

const Logo = ({ size = 'medium' }) => {
    return (
        <Link to="/dashboard" className={`logo logo--${size}`} aria-label="Medicine Store - Go to dashboard">
            <span className="logo__icon">
                <Icon name="logo" size={size === 'large' ? 44 : 40} />
            </span>
        </Link>
    );
};

export default Logo;
