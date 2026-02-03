import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import Icon from '../../components/Icon';
import pillImage from '../../assets/pill_inline.png';
import './LoginPage.css';

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
}).required();

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, error } = useAuth();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            // Updated demo credentials to match the feeling, though functionality remains same
            email: 'admin@medstore.com',
            password: 'password123'
        }
    });

    const onSubmit = async (data) => {
        await login(data.email, data.password);
        navigate('/dashboard');
    };

    return (
        <div className="login-page">
            {/* Background Decorative Shapes */}
            <div className="login-bg-shape login-bg-shape--1" />
            <div className="login-bg-shape login-bg-shape--2" />

            <div className="login-container">
                {/* Header Logo */}
                <header className="login-header">
                    <div className="login-brand">
                        <div className="login-brand__icon">
                            <Icon name="logo" size={32} />
                        </div>
                        <span className="login-brand__text">E-Pharmacy</span>
                    </div>
                </header>

                <main className="login-content">
                    {/* Left/Top Section: Text & Visuals */}
                    <div className="login-visuals">
                        <div className="pill-div">
                            <p className="login-title">Your medication,</p>
                            <img src={pillImage} alt="Pill" className="title-pill-img" />
                        </div>
                        <p className="login-title"> delivered Say goodbye to all <span className="text-highlight">your healthcare</span> worries with us</p>
                    </div>

                    {/* Right/Bottom Section: Form */}
                    <div className="login-form-wrapper">
                        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                            {error && (
                                <div className="form-alert form-alert--error" role="alert">
                                    <Icon name="close" size={20} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="form-group">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email address"
                                    className={`form-input-rounded ${errors.email ? 'form-input--error' : ''}`}
                                    {...register('email')}
                                />
                                {errors.email && <span className="form-error">{errors.email.message}</span>}
                            </div>

                            <div className="form-group">
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    className={`form-input-rounded ${errors.password ? 'form-input--error' : ''}`}
                                    {...register('password')}
                                />
                                {errors.password && <span className="form-error">{errors.password.message}</span>}
                            </div>

                            <button
                                type="submit"
                                className="login-btn-rounded"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Logging in...' : 'Log in'}
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LoginPage;
