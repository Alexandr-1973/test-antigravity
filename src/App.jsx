import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SharedLayout from './components/SharedLayout/SharedLayout';
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import AllOrdersPage from './pages/AllOrdersPage/AllOrdersPage';
import AllProductsPage from './pages/AllProductsPage/AllProductsPage';
import AllSuppliersPage from './pages/AllSuppliersPage/AllSuppliersPage';
import CustomersDataPage from './pages/CustomersDataPage/CustomersDataPage';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route element={<SharedLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/orders" element={<AllOrdersPage />} />
                    <Route path="/products" element={<AllProductsPage />} />
                    <Route path="/suppliers" element={<AllSuppliersPage />} />
                    <Route path="/customers" element={<CustomersDataPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
