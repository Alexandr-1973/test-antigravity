import { useState, useEffect } from 'react';
import { productsApi } from '../../services/api';
import { productCategories } from '../../data/mockData';
import Filter from '../../components/Filter/Filter';
import Modal from '../../components/Modal/Modal';
import ProductForm from '../../components/ProductForm/ProductForm';
import Icon from '../../components/Icon/Icon';
import styles from './AllProductsPage.module.css';

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProducts = async (filterName = '') => {
        setIsLoading(true);
        try {
            const data = filterName
                ? await productsApi.getByName(filterName)
                : await productsApi.getAll();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleFilter = (name) => {
        fetchProducts(name);
    };

    const handleAddProduct = async (productData) => {
        try {
            await productsApi.create(productData);
            fetchProducts();
            setIsAddModalOpen(false);
        } catch (error) {
            console.error('Failed to add product:', error);
        }
    };

    const handleEditProduct = async (productData) => {
        try {
            await productsApi.update(selectedProduct.id, productData);
            fetchProducts();
            setIsEditModalOpen(false);
            setSelectedProduct(null);
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await productsApi.delete(id);
                fetchProducts();
            } catch (error) {
                console.error('Failed to delete product:', error);
            }
        }
    };

    const openEditModal = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return (
        <div className={styles.productsPage}>
            <div className={styles.productsPageHeader}>
                <Filter placeholder="Product Name" onFilter={handleFilter} />
                <button
                    className={styles.productsPageAddBtn}
                    onClick={() => setIsAddModalOpen(true)}
                >
                    <Icon name="plus" size={16} />
                    Add a new product
                </button>
            </div>

            <div className={styles.productsPageContent}>
                <div className={styles.productsPageTableContainer}>
                    <h2 className={styles.productsPageTitle}>All products</h2>

                    {isLoading ? (
                        <div className={styles.productsPageLoading}>
                            <div className="loadingSpinner" />
                        </div>
                    ) : (
                        <div className={styles.productsPageTableWrapper}>
                            <table className={styles.productsPageTable}>
                                <thead>
                                    <tr>
                                        <th>Product Info</th>
                                        <th>Category</th>
                                        <th>Stock</th>
                                        <th>Suppliers</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className={styles.productsPageEmpty}>
                                                No products found
                                            </td>
                                        </tr>
                                    ) : (
                                        products.map((product) => (
                                            <tr key={product.id}>
                                                <td>
                                                    <span className={styles.productsPageName}>{product.name}</span>
                                                </td>
                                                <td>
                                                    <span className={styles.productsPageCategory}>{product.category}</span>
                                                </td>
                                                <td>{product.stock}</td>
                                                <td>{product.suppliers}</td>
                                                <td>{formatCurrency(product.price)}</td>
                                                <td>
                                                    <div className={styles.productsPageActions}>
                                                        <button
                                                            className={`${styles.productsPageActionBtn} ${styles.productsPageActionBtnEdit}`}
                                                            onClick={() => openEditModal(product)}
                                                            title="Edit product"
                                                        >
                                                            <Icon name="edit" size={16} />
                                                        </button>
                                                        <button
                                                            className={`${styles.productsPageActionBtn} ${styles.productsPageActionBtnDelete}`}
                                                            onClick={() => handleDeleteProduct(product.id)}
                                                            title="Delete product"
                                                        >
                                                            <Icon name="delete" size={16} />
                                                        </button>
                                                    </div>
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
                title="Add a new product"
            >
                <ProductForm
                    categories={productCategories}
                    onSubmit={handleAddProduct}
                    onCancel={() => setIsAddModalOpen(false)}
                    submitLabel="Add"
                />
            </Modal>

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedProduct(null);
                }}
                title="Edit product data"
            >
                <ProductForm
                    initialData={selectedProduct}
                    categories={productCategories}
                    onSubmit={handleEditProduct}
                    onCancel={() => {
                        setIsEditModalOpen(false);
                        setSelectedProduct(null);
                    }}
                    submitLabel="Save"
                />
            </Modal>
        </div>
    );
};

export default AllProductsPage;
