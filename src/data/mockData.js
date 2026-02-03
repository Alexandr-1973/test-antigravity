// Mock data for the Medicine Store Admin Panel

export const mockUsers = [
    {
        id: '1',
        email: 'admin@medstore.com',
        password: 'password123',
        name: 'Admin User'
    }
];

export const mockProducts = [
    {
        id: '1',
        name: 'Aspirin 500mg',
        category: 'Medicine',
        stock: 150,
        suppliers: 'PharmaCorp',
        price: 12.99,
        createdAt: '2024-01-15T10:00:00Z'
    },
    {
        id: '2',
        name: 'Vitamin D3 1000IU',
        category: 'Vitamins & Supplements',
        stock: 200,
        suppliers: 'VitaHealth',
        price: 24.99,
        createdAt: '2024-01-14T09:30:00Z'
    },
    {
        id: '3',
        name: 'Moisturizing Cream',
        category: 'Skin Care',
        stock: 75,
        suppliers: 'DermaCare',
        price: 18.50,
        createdAt: '2024-01-13T14:20:00Z'
    },
    {
        id: '4',
        name: 'Eye Drops Solution',
        category: 'Eye Care',
        stock: 120,
        suppliers: 'OptiVision',
        price: 9.99,
        createdAt: '2024-01-12T11:15:00Z'
    },
    {
        id: '5',
        name: 'Dental Floss Pack',
        category: 'Dental Care',
        stock: 300,
        suppliers: 'DentaSupply',
        price: 5.99,
        createdAt: '2024-01-11T16:45:00Z'
    },
    {
        id: '6',
        name: 'Baby Shampoo',
        category: 'Baby Care',
        stock: 85,
        suppliers: 'BabyFirst',
        price: 14.99,
        createdAt: '2024-01-10T08:00:00Z'
    },
    {
        id: '7',
        name: 'Knee Support Brace',
        category: 'Orthopedic Products',
        stock: 45,
        suppliers: 'OrthoMed',
        price: 35.00,
        createdAt: '2024-01-09T13:30:00Z'
    },
    {
        id: '8',
        name: 'Ibuprofen 400mg',
        category: 'Medicine',
        stock: 180,
        suppliers: 'PharmaCorp',
        price: 8.99,
        createdAt: '2024-01-08T10:20:00Z'
    },
    {
        id: '9',
        name: 'Hand Sanitizer Gel',
        category: 'Hand',
        stock: 250,
        suppliers: 'CleanHands Inc',
        price: 6.50,
        createdAt: '2024-01-07T15:00:00Z'
    },
    {
        id: '10',
        name: 'Headache Relief Tablets',
        category: 'Head',
        stock: 95,
        suppliers: 'MediRelief',
        price: 11.99,
        createdAt: '2024-01-06T09:45:00Z'
    }
];

export const mockSuppliers = [
    {
        id: '1',
        name: 'Alex Shatov',
        address: '1234 Pharma Lane, NY 10001',
        company: 'PharmaCorp',
        deliveryDate: '2024-01-20',
        amount: 15000.00,
        status: 'Active'
    },
    {
        id: '2',
        name: 'Philip Harbach',
        address: '567 Vita Street, CA 90210',
        company: 'VitaHealth',
        deliveryDate: '2024-01-22',
        amount: 8500.00,
        status: 'Active'
    },
    {
        id: '3',
        name: 'Mirko Fisuk',
        address: '890 Derma Ave, TX 75001',
        company: 'DermaCare',
        deliveryDate: '2024-01-18',
        amount: 12000.00,
        status: 'Active'
    },
    {
        id: '4',
        name: 'Olga Semklo',
        address: '432 Vision Blvd, FL 33101',
        company: 'OptiVision',
        deliveryDate: '2024-01-25',
        amount: 6700.00,
        status: 'Deactive'
    },
    {
        id: '5',
        name: 'Burak Long',
        address: '765 Denta Road, WA 98101',
        company: 'DentaSupply',
        deliveryDate: '2024-01-19',
        amount: 9200.00,
        status: 'Active'
    }
];

export const mockCustomers = [
    {
        id: '1',
        name: 'Alex Shatov',
        email: 'alex.shatov@gmail.com',
        address: '1234 Main St, New York, NY 10001',
        phone: '+1 (555) 123-4567',
        registerDate: '2023-12-15',
        spent: 1250.00,
        image: '/avatars/alex-shatov.jpg'
    },
    {
        id: '2',
        name: 'Philip Harbach',
        email: 'philip.h@yahoo.com',
        address: '567 Oak Ave, Los Angeles, CA 90210',
        phone: '+1 (555) 234-5678',
        registerDate: '2023-11-20',
        spent: 890.50,
        image: '/avatars/philip-harbach.jpg'
    },
    {
        id: '3',
        name: 'Mirko Fisuk',
        email: 'mirko.fisuk@outlook.com',
        address: '890 Pine Rd, Dallas, TX 75001',
        phone: '+1 (555) 345-6789',
        registerDate: '2023-10-10',
        spent: 2100.00,
        image: '/avatars/mirko-fisuk.jpg'
    },
    {
        id: '4',
        name: 'Olga Semklo',
        email: 'olga.s@gmail.com',
        address: '432 Elm St, Miami, FL 33101',
        phone: '+1 (555) 456-7890',
        registerDate: '2024-01-05',
        spent: 450.75,
        image: '/avatars/olga-semklo.jpg'
    },
    {
        id: '5',
        name: 'Burak Long',
        email: 'burak.long@company.com',
        address: '765 Cedar Blvd, Seattle, WA 98101',
        phone: '+1 (555) 567-8901',
        registerDate: '2023-09-25',
        spent: 3200.00,
        image: null
    },
    {
        id: '6',
        name: 'Anna Wilson',
        email: 'anna.wilson@email.com',
        address: '321 Birch Lane, Boston, MA 02101',
        phone: '+1 (555) 678-9012',
        registerDate: '2023-08-15',
        spent: 1780.25,
        image: null
    },
    {
        id: '7',
        name: 'James Chen',
        email: 'james.chen@mail.com',
        address: '654 Maple Dr, Chicago, IL 60601',
        phone: '+1 (555) 789-0123',
        registerDate: '2023-07-20',
        spent: 920.00,
        image: null
    },
    {
        id: '8',
        name: 'Sarah Miller',
        email: 'sarah.m@inbox.com',
        address: '987 Walnut St, Denver, CO 80201',
        phone: '+1 (555) 890-1234',
        registerDate: '2023-06-10',
        spent: 1550.50,
        image: null
    }
];

export const mockOrders = [
    {
        id: '1',
        user: {
            name: 'Alex Shatov',
            image: null
        },
        address: '1234 Main St, NY',
        products: 3,
        orderDate: '2024-01-15',
        price: 125.00,
        status: 'Completed'
    },
    {
        id: '2',
        user: {
            name: 'Philip Harbach',
            image: null
        },
        address: '567 Oak Ave, LA',
        products: 2,
        orderDate: '2024-01-14',
        price: 89.50,
        status: 'Confirmed'
    },
    {
        id: '3',
        user: {
            name: 'Mirko Fisuk',
            image: null
        },
        address: '890 Pine Rd, Dallas',
        products: 5,
        orderDate: '2024-01-13',
        price: 210.00,
        status: 'Pending'
    },
    {
        id: '4',
        user: {
            name: 'Olga Semklo',
            image: null
        },
        address: '432 Elm St, Miami',
        products: 1,
        orderDate: '2024-01-12',
        price: 45.75,
        status: 'Cancelled'
    },
    {
        id: '5',
        user: {
            name: 'Burak Long',
            image: null
        },
        address: '765 Cedar Blvd, Seattle',
        products: 4,
        orderDate: '2024-01-11',
        price: 178.25,
        status: 'Processing'
    },
    {
        id: '6',
        user: {
            name: 'Anna Wilson',
            image: null
        },
        address: '321 Birch Lane, Boston',
        products: 2,
        orderDate: '2024-01-10',
        price: 67.00,
        status: 'Shipped'
    },
    {
        id: '7',
        user: {
            name: 'James Chen',
            image: null
        },
        address: '654 Maple Dr, Chicago',
        products: 3,
        orderDate: '2024-01-09',
        price: 145.50,
        status: 'Delivered'
    }
];

export const mockIncomeExpenses = [
    { id: '1', type: 'income', name: 'Alex Shatov', amount: 125.00 },
    { id: '2', type: 'expense', name: 'Advertising', amount: 500.00 },
    { id: '3', type: 'income', name: 'Philip Harbach', amount: 89.50 },
    { id: '4', type: 'expense', name: 'Inventory Restock', amount: 1200.00 },
    { id: '5', type: 'income', name: 'Mirko Fisuk', amount: 210.00 },
    { id: '6', type: 'expense', name: 'Utilities', amount: 350.00 },
    { id: '7', type: 'income', name: 'Anna Wilson', amount: 67.00 },
    { id: '8', type: 'income', name: 'James Chen', amount: 145.50 }
];

export const productCategories = [
    'Medicine',
    'Head',
    'Hand',
    'Dental Care',
    'Skin Care',
    'Eye Care',
    'Vitamins & Supplements',
    'Orthopedic Products',
    'Baby Care'
];

export const supplierStatuses = ['Active', 'Deactive'];

export const orderStatuses = [
    'Pending',
    'Processing',
    'Confirmed',
    'Shipped',
    'Delivered',
    'Completed',
    'Cancelled'
];
