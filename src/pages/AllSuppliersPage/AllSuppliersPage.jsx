import { useState, useEffect } from 'react';
import { suppliersApi } from '../../services/api';
import { supplierStatuses } from '../../data/mockData';
import Filter from '../../components/Filter';
import Modal from '../../components/Modal';
import SupplierForm from '../../components/SupplierForm';
import Icon from '../../components/Icon';
import './AllSuppliersPage.css';

const AllSuppliersPage = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const fetchSuppliers = async (filterName = '') => {
        setIsLoading(true);
        try {
            const data = filterName
                ? await suppliersApi.getByName(filterName)
                : await suppliersApi.getAll();
            setSuppliers(data);
        } catch (error) {
            console.error('Failed to fetch suppliers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const handleFilter = (name) => {
        fetchSuppliers(name);
    };

    const handleAddSupplier = async (supplierData) => {
        try {
            await suppliersApi.create(supplierData);
            fetchSuppliers();
            setIsAddModalOpen(false);
        } catch (error) {
            console.error('Failed to add supplier:', error);
        }
    };

    const handleEditSupplier = async (supplierData) => {
        try {
            await suppliersApi.update(selectedSupplier.id, supplierData);
            fetchSuppliers();
            setIsEditModalOpen(false);
            setSelectedSupplier(null);
        } catch (error) {
            console.error('Failed to update supplier:', error);
        }
    };

    const openEditModal = (supplier) => {
        setSelectedSupplier(supplier);
        setIsEditModalOpen(true);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusClass = (status) => {
        return `status-badge status-badge--${status.toLowerCase()}`;
    };

    return (
        <div className="suppliers-page">
            <div className="suppliers-page__header">
                <Filter placeholder="User Name" onFilter={handleFilter} />
                <button
                    className="suppliers-page__add-btn"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    <Icon name="plus" size={16} />
                    Add a new supplier
                </button>
            </div>

            <div className="suppliers-page__content">
                <div className="suppliers-page__table-container">
                    <h2 className="suppliers-page__title">All suppliers</h2>

                    {isLoading ? (
                        <div className="suppliers-page__loading">
                            <div className="loading-spinner" />
                        </div>
                    ) : (
                        <div className="suppliers-page__table-wrapper">
                            <table className="suppliers-page__table">
                                <thead>
                                    <tr>
                                        <th>Suppliers Info</th>
                                        <th>Address</th>
                                        <th>Company</th>
                                        <th>Delivery date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {suppliers.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="suppliers-page__empty">
                                                No suppliers found
                                            </td>
                                        </tr>
                                    ) : (
                                        suppliers.map((supplier) => (
                                            <tr key={supplier.id}>
                                                <td>
                                                    <div className="suppliers-page__user">
                                                        <div className="suppliers-page__avatar">
                                                            {supplier.name.charAt(0)}
                                                        </div>
                                                        <span>{supplier.name}</span>
                                                    </div>
                                                </td>
                                                <td>{supplier.address}</td>
                                                <td>{supplier.company}</td>
                                                <td>{formatDate(supplier.deliveryDate)}</td>
                                                <td>{formatCurrency(supplier.amount)}</td>
                                                <td>
                                                    <span className={getStatusClass(supplier.status)}>
                                                        {supplier.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="suppliers-page__action-btn"
                                                        onClick={() => openEditModal(supplier)}
                                                        title="Edit supplier"
                                                    >
                                                        <Icon name="edit" size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add a new supplier"
            >
                <SupplierForm
                    statuses={supplierStatuses}
                    onSubmit={handleAddSupplier}
                    onCancel={() => setIsAddModalOpen(false)}
                    submitLabel="Add"
                />
            </Modal>

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedSupplier(null);
                }}
                title="Edit supplier data"
            >
                <SupplierForm
                    initialData={selectedSupplier}
                    statuses={supplierStatuses}
                    onSubmit={handleEditSupplier}
                    onCancel={() => {
                        setIsEditModalOpen(false);
                        setSelectedSupplier(null);
                    }}
                    submitLabel="Save"
                />
            </Modal>
        </div>
    );
};

export default AllSuppliersPage;
