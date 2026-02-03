import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SharedLayout from './components/SharedLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AllOrdersPage from './pages/AllOrdersPage';
import AllProductsPage from './pages/AllProductsPage';
import AllSuppliersPage from './pages/AllSuppliersPage';
import CustomersDataPage from './pages/CustomersDataPage';
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
