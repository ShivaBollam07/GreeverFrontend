import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';
import './App.css';
import Navbar from './Components/Navbar'
import Courses from './Pages/Courses';
import Reads from './Pages/Reads';
import Aboutus from './Pages/Aboutus';
import Home from './Pages/Home';
import Footer from './Pages/Footer';
import Login from './Pages/Login';
import Signup from './Pages/SignUp';
import Logout from './Pages/Logout';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode.jwtDecode(token);
          if (decodedToken && Date.now() < decodedToken.exp * 1000) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <Navbar username={localStorage.getItem('token')} onLogout={handleLogout} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/reads" element={<Reads />} />
              <Route path="/about" element={<Aboutus />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
          <Footer />
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;