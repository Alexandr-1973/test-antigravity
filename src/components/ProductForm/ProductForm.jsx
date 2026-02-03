import { useState, useEffect } from 'react';
import './ProductForm.css';

const ProductForm = ({
    initialData = null,
    categories = [],
    onSubmit,
    onCancel,
    submitLabel = 'Submit'
}) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        stock: '',
        suppliers: '',
        price: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                category: initialData.category || '',
                stock: initialData.stock?.toString() || '',
                suppliers: initialData.suppliers || '',
                price: initialData.price?.toString() || ''
            });
        }
    }, [initialData]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Product name is required';
        }
        if (!formData.category) {
            newErrors.category = 'Category is required';
        }
        if (!formData.stock || isNaN(formData.stock) || Number(formData.stock) < 0) {
            newErrors.stock = 'Valid stock quantity is required';
        }
        if (!formData.suppliers.trim()) {
            newErrors.suppliers = 'Supplier is required';
        }
        if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
            newErrors.price = 'Valid price is required';
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
                category: formData.category,
                stock: Number(formData.stock),
                suppliers: formData.suppliers.trim(),
                price: Number(formData.price)
            });
        }
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <div className="product-form__field">
                <label htmlFor="name" className="product-form__label">
                    Product Info
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className={`product-form__input ${errors.name ? 'product-form__input--error' : ''}`}
                    placeholder="Product name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <span className="product-form__error">{errors.name}</span>}
            </div>

            <div className="product-form__field">
                <label htmlFor="category" className="product-form__label">
                    Category
                </label>
                <select
                    id="category"
                    name="category"
                    className={`product-form__select ${errors.category ? 'product-form__input--error' : ''}`}
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                {errors.category && <span className="product-form__error">{errors.category}</span>}
            </div>

            <div className="product-form__row">
                <div className="product-form__field">
                    <label htmlFor="stock" className="product-form__label">
                        Stock
                    </label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        className={`product-form__input ${errors.stock ? 'product-form__input--error' : ''}`}
                        placeholder="0"
                        min="0"
                        value={formData.stock}
                        onChange={handleChange}
                    />
                    {errors.stock && <span className="product-form__error">{errors.stock}</span>}
                </div>

                <div className="product-form__field">
                    <label htmlFor="price" className="product-form__label">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        className={`product-form__input ${errors.price ? 'product-form__input--error' : ''}`}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                    />
                    {errors.price && <span className="product-form__error">{errors.price}</span>}
                </div>
            </div>

            <div className="product-form__field">
                <label htmlFor="suppliers" className="product-form__label">
                    Suppliers
                </label>
                <input
                    type="text"
                    id="suppliers"
                    name="suppliers"
                    className={`product-form__input ${errors.suppliers ? 'product-form__input--error' : ''}`}
                    placeholder="Supplier name"
                    value={formData.suppliers}
                    onChange={handleChange}
                />
                {errors.suppliers && <span className="product-form__error">{errors.suppliers}</span>}
            </div>

            <div className="product-form__actions">
                <button type="button" className="product-form__btn product-form__btn--cancel" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="product-form__btn product-form__btn--submit">
                    {submitLabel}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
