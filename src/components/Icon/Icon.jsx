import sprite from '../../assets/sprite.svg';
import './Icon.css';

const Icon = ({ name, size = 24, className = '', ...props }) => {
    return (
        <svg
            className={`icon ${className}`}
            width={size}
            height={size}
            aria-hidden="true"
            {...props}
        >
            <use href={`${sprite}#icon-${name}`} />
        </svg>
    );
};

export default Icon;
