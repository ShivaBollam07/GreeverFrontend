import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CompanyLogo from '../assets/Greever-logo.png';
import './Styles/Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/app/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setShowOtpInput(true);
      } else {
        setError(data.message || 'An error occurred. Please try again.');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    setVerifyOtpLoading(true);
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:3000/app/v1/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        navigate('/login');
      } else {
        setError(data.message || 'Invalid OTP. Please try again.');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
    setVerifyOtpLoading(false);
  };

  return (
    <div className="signup-container">
      <img src={CompanyLogo} alt="Company Logo" className="logo" />
      <h2>Sign Up</h2>
      {!showOtpInput ? (
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
            <button type="submit" disabled={loading}>
                {loading ? 'Sending OTP...' : 'Send OTP '}
            </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            required
          />
            <button type="submit" disabled={verifyOtpLoading}>
                {verifyOtpLoading ? 'Verifying OTP...' : 'Verify OTP'}
            </button>
        </form>
      )}
      {error && <p className="error-message">{error}</p>}
      <p>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default Signup;