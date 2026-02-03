import { useState, useEffect } from 'react';
import './SupplierForm.css';

const SupplierForm = ({
    initialData = null,
    statuses = [],
    onSubmit,
    onCancel,
    submitLabel = 'Submit'
}) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        company: '',
        deliveryDate: '',
        amount: '',
        status: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                address: initialData.address || '',
                company: initialData.company || '',
                deliveryDate: initialData.deliveryDate || '',
                amount: initialData.amount?.toString() || '',
                status: initialData.status || ''
            });
        }
    }, [initialData]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Supplier name is required';
        }
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }
        if (!formData.company.trim()) {
            newErrors.company = 'Company is required';
        }
        if (!formData.deliveryDate) {
            newErrors.deliveryDate = 'Delivery date is required';
        }
        if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
            newErrors.amount = 'Valid amount is required';
        }
        if (!formData.status) {
            newErrors.status = 'Status is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({
                name: formData.name.trim(),
                address: formData.address.trim(),
                company: formData.company.trim(),
                deliveryDate: formData.deliveryDate,
                amount: Number(formData.amount),
                status: formData.status
            });
        }
    };

    return (
        <form className="supplier-form" onSubmit={handleSubmit}>
            <div className="supplier-form__field">
                <label htmlFor="name" className="supplier-form__label">
                    Suppliers Info
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className={`supplier-form__input ${errors.name ? 'supplier-form__input--error' : ''}`}
                    placeholder="Supplier name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <span className="supplier-form__error">{errors.name}</span>}
            </div>

            <div className="supplier-form__field">
                <label htmlFor="address" className="supplier-form__label">
                    Address
                </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    className={`supplier-form__input ${errors.address ? 'supplier-form__input--error' : ''}`}
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                />
                {errors.address && <span className="supplier-form__error">{errors.address}</span>}
            </div>

            <div className="supplier-form__field">
                <label htmlFor="company" className="supplier-form__label">
                    Company
                </label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    className={`supplier-form__input ${errors.company ? 'supplier-form__input--error' : ''}`}
                    placeholder="Company name"
                    value={formData.company}
                    onChange={handleChange}
                />
                {errors.company && <span className="supplier-form__error">{errors.company}</span>}
            </div>

            <div className="supplier-form__row">
                <div className="supplier-form__field">
                    <label htmlFor="deliveryDate" className="supplier-form__label">
                        Delivery date
                    </label>
                    <input
                        type="date"
                        id="deliveryDate"
                        name="deliveryDate"
                        className={`supplier-form__input ${errors.deliveryDate ? 'supplier-form__input--error' : ''}`}
                        value={formData.deliveryDate}
                        onChange={handleChange}
                    />
                    {errors.deliveryDate && <span className="supplier-form__error">{errors.deliveryDate}</span>}
                </div>

                <div className="supplier-form__field">
                    <label htmlFor="amount" className="supplier-form__label">
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        className={`supplier-form__input ${errors.amount ? 'supplier-form__input--error' : ''}`}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        value={formData.amount}
                        onChange={handleChange}
                    />
                    {errors.amount && <span className="supplier-form__error">{errors.amount}</span>}
                </div>
            </div>

            <div className="supplier-form__field">
                <label htmlFor="status" className="supplier-form__label">
                    Status
                </label>
                <select
                    id="status"
                    name="status"
                    className={`supplier-form__select ${errors.status ? 'supplier-form__input--error' : ''}`}
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="">Select status</option>
                    {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
                {errors.status && <span className="supplier-form__error">{errors.status}</span>}
            </div>

            <div className="supplier-form__actions">
                <button type="button" className="supplier-form__btn supplier-form__btn--cancel" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="supplier-form__btn supplier-form__btn--submit">
                    {submitLabel}
                </button>
            </div>
        </form>
    );
};

export default SupplierForm;
