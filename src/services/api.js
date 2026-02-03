// API Service Layer - Mock implementation with localStorage persistence
import {
    mockUsers,
    mockProducts,
    mockSuppliers,
    mockCustomers,
    mockOrders,
    mockIncomeExpenses
} from '../data/mockData';

// Helper to simulate network delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get data from localStorage or use mock data
const getStoredData = (key, defaultData) => {
    const stored = localStorage.getItem(key);
    if (stored) {
        return JSON.parse(stored);
    }
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
};

const setStoredData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};


// ============ AUTH API ============
export const authApi = {
    login: async (email, password) => {
        await delay();
        const users = getStoredData('users', mockUsers);
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            const token = btoa(JSON.stringify({ userId: user.id, email: user.email }));
            localStorage.setItem('authToken', token);
            localStorage.setItem('currentUser', JSON.stringify({ id: user.id, email: user.email, name: user.name }));
            return { success: true, user: { id: user.id, email: user.email, name: user.name }, token };
        }

        throw new Error('Invalid email or password');
    },

    logout: async () => {
        await delay(100);
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        return { success: true };
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    }
};

// ============ PRODUCTS API ============
export const productsApi = {
    getAll: async () => {
        await delay();
        const products = getStoredData('products', mockProducts);
        // Sort by createdAt descending (newest first)
        return products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    getByName: async (name) => {
        await delay();
        const products = getStoredData('products', mockProducts);
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(name.toLowerCase())
        );
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    create: async (product) => {
        await delay();
        const products = getStoredData('products', mockProducts);
        const newProduct = {
            ...product,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        products.push(newProduct);
        setStoredData('products', products);
        return newProduct;
    },

    update: async (id, updates) => {
        await delay();
        const products = getStoredData('products', mockProducts);
        const index = products.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Product not found');

        products[index] = { ...products[index], ...updates };
        setStoredData('products', products);
        return products[index];
    },

    delete: async (id) => {
        await delay();
        const products = getStoredData('products', mockProducts);
        const filtered = products.filter(p => p.id !== id);
        setStoredData('products', filtered);
        return { success: true };
    },

    getCount: async () => {
        await delay(100);
        const products = getStoredData('products', mockProducts);
        return products.length;
    }
};

// ============ SUPPLIERS API ============
export const suppliersApi = {
    getAll: async () => {
        await delay();
        return getStoredData('suppliers', mockSuppliers);
    },

    getByName: async (name) => {
        await delay();
        const suppliers = getStoredData('suppliers', mockSuppliers);
        return suppliers.filter(s =>
            s.name.toLowerCase().includes(name.toLowerCase())
        );
    },

    create: async (supplier) => {
        await delay();
        const suppliers = getStoredData('suppliers', mockSuppliers);
        const newSupplier = {
            ...supplier,
            id: Date.now().toString()
        };
        suppliers.push(newSupplier);
        setStoredData('suppliers', suppliers);
        return newSupplier;
    },

    update: async (id, updates) => {
        await delay();
        const suppliers = getStoredData('suppliers', mockSuppliers);
        const index = suppliers.findIndex(s => s.id === id);
        if (index === -1) throw new Error('Supplier not found');

        suppliers[index] = { ...suppliers[index], ...updates };
        setStoredData('suppliers', suppliers);
        return suppliers[index];
    },

    delete: async (id) => {
        await delay();
        const suppliers = getStoredData('suppliers', mockSuppliers);
        const filtered = suppliers.filter(s => s.id !== id);
        setStoredData('suppliers', filtered);
        return { success: true };
    },

    getCount: async () => {
        await delay(100);
        const suppliers = getStoredData('suppliers', mockSuppliers);
        return suppliers.length;
    }
};

// ============ CUSTOMERS API ============
export const customersApi = {
    getAll: async (page = 1, limit = 5) => {
        await delay();
        const customers = getStoredData('customers', mockCustomers);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        return {
            data: customers.slice(startIndex, endIndex),
            total: customers.length,
            page,
            totalPages: Math.ceil(customers.length / limit)
        };
    },

    getByName: async (name, page = 1, limit = 5) => {
        await delay();
        const customers = getStoredData('customers', mockCustomers);
        const filtered = customers.filter(c =>
            c.name.toLowerCase().includes(name.toLowerCase())
        );
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        return {
            data: filtered.slice(startIndex, endIndex),
            total: filtered.length,
            page,
            totalPages: Math.ceil(filtered.length / limit)
        };
    },

    getRecent: async (limit = 5) => {
        await delay();
        const customers = getStoredData('customers', mockCustomers);
        return customers.slice(0, limit);
    },

    getCount: async () => {
        await delay(100);
        const customers = getStoredData('customers', mockCustomers);
        return customers.length;
    }
};

// ============ ORDERS API ============
export const ordersApi = {
    getAll: async () => {
        await delay();
        return getStoredData('orders', mockOrders);
    },

    getByUserName: async (name) => {
        await delay();
        const orders = getStoredData('orders', mockOrders);
        return orders.filter(o =>
            o.user.name.toLowerCase().includes(name.toLowerCase())
        );
    }
};

// ============ DASHBOARD API ============
export const dashboardApi = {
    getStatistics: async () => {
        await delay();
        const products = getStoredData('products', mockProducts);
        const suppliers = getStoredData('suppliers', mockSuppliers);
        const customers = getStoredData('customers', mockCustomers);

        return {
            products: products.length,
            suppliers: suppliers.length,
            customers: customers.length
        };
    },

    getRecentCustomers: async (limit = 5) => {
        await delay();
        const customers = getStoredData('customers', mockCustomers);
        return customers.slice(0, limit);
    },

    getIncomeExpenses: async () => {
        await delay();
        return getStoredData('incomeExpenses', mockIncomeExpenses);
    }
};
