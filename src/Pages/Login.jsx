import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CompanyLogo from '../assets/Greever-logo.png';
import './Styles/Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line react/prop-types
const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loginloading, setLoginLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:3000/app/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.status === 'success') {
                toast.success('Login successful');
                localStorage.setItem('token', data.token);
                onLogin(); 
                setTimeout(() => {
                    navigate('/home');
                } , 3000);
            } else {
                setError('Invalid credentials. Please try again.');
            }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
        setLoginLoading(false);
    };

    return (
        <div className="login-container">
            <img src={CompanyLogo} alt="Company Logo" className="logo" />
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />
                <button type="submit" className="submit-button" disabled={loginloading}>
                    {loginloading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p>
                Don&rsquo;t have an account? <Link to="/signup">Sign up</Link>
            </p>
            <ToastContainer />
        </div>
    );
};

export default Login;