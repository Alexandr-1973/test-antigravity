import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import Icon from '../../components/Icon/Icon';
import pillImage from '../../assets/pill_inline.png';
import styles from './LoginPage.module.css';

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
            email: 'admin@medstore.com',
            password: 'password123'
        }
    });

    const onSubmit = async (data) => {
        await login(data.email, data.password);
        navigate('/dashboard');
    };

    return (
        <div className={styles.loginPage}>
            {/* Background Decorative Shapes */}
            <div className={`${styles.loginBgShape} ${styles.loginBgShape1}`} />
            <div className={`${styles.loginBgShape} ${styles.loginBgShape2}`} />

            <div className={styles.loginContainer}>
                {/* Header Logo */}
                <header className={styles.loginHeader}>
                    <div className={styles.loginBrand}>
                        <div className={styles.loginBrandIcon}>
                            <Icon name="logo" size={32} />
                        </div>
                        <span className={styles.loginBrandText}>E-Pharmacy</span>
                    </div>
                </header>

                <main className={styles.loginContent}>
                    {/* Left/Top Section: Text & Visuals */}
                    <div className={styles.loginVisuals}>
                        <h1 className={styles.loginTitle}>
                            Your medication,{' '}
                            <span className={styles.pillWrapper}>
                                <img src={pillImage} alt="Pill" className={styles.titlePillImg} />
                            </span>{' '}
                            delivered
                        </h1>
                        <p className={styles.loginSubtitle}>
                            Say goodbye to all <span className={styles.textHighlight}>your healthcare</span> worries with us
                        </p>
                    </div>

                    {/* Right/Bottom Section: Form */}
                    <div className={styles.loginFormWrapper}>
                        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                            {error && (
                                <div className={`${styles.formAlert} ${styles.formAlertError}`} role="alert">
                                    <Icon name="close" size={20} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className={styles.formGroup}>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email address"
                                    className={`${styles.formInputRounded} ${errors.email ? styles.formInputError : ''}`}
                                    {...register('email')}
                                />
                                {errors.email && <span className={styles.formError}>{errors.email.message}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    className={`${styles.formInputRounded} ${errors.password ? styles.formInputError : ''}`}
                                    {...register('password')}
                                />
                                {errors.password && <span className={styles.formError}>{errors.password.message}</span>}
                            </div>

                            <button
                                type="submit"
                                className={styles.loginBtnRounded}
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
