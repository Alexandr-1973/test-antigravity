import { useState } from 'react';
import Icon from '../Icon/Icon';
import './Filter.css';

const Filter = ({ placeholder = 'Search...', onFilter }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(value);
    };

    const handleClear = () => {
        setValue('');
        onFilter('');
    };

    return (
        <form className="filter" onSubmit={handleSubmit}>
            <div className="filter__input-wrapper">
                <Icon name="filter" size={18} className="filter__icon" />
                <input
                    type="text"
                    className="filter__input"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                {value && (
                    <button
                        type="button"
                        className="filter__clear"
                        onClick={handleClear}
                        aria-label="Clear filter"
                    >
                        <Icon name="close" size={16} />
                    </button>
                )}
            </div>
            <button type="submit" className="filter__button">
                Filter
            </button>
        </form>
    );
};

export default Filter;
