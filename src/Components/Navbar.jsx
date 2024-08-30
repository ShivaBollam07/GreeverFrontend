import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CompanyLogo from '../assets/Greever-logo.png';
import ProfileIcon from '../assets/profile-logo.png';
import './Styles/Navbar.css';

// eslint-disable-next-line react/prop-types
function Navbar({ username }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await fetch('http://localhost:3000/app/v1/auth/getname', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: username }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch name');
        }

        const data = await response.json();

        if (data.status === 'success' && data.name) {
          setName(data.name);
        } else {
          throw new Error('Name not found in response');
        }
      } catch (err) {
        console.error('Error fetching name:', err);
        setError('Failed to load name');
      } finally {
        setIsLoading(false);
      }
    };

    fetchName();
  }, [username]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const displayName = isLoading ? 'Loading...' : error ? 'User' : name;

  const handleProfileClick = () => {
    setShowModal(!showModal);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowModal(false);
  };

  return (
    <div className='MainDiv'>
      <nav className="Navbar">
          <img src={CompanyLogo} alt="GreeverLogo" className="CompanyLogo" 
          onClick={() => navigate('/home')}
          />
        <div className={`NavLinksContainer ${isMenuOpen ? 'active' : ''}`}>
          <ul className="NavLinks">
            <li><Link to="/home" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/courses" onClick={toggleMenu}>Courses</Link></li>
            <li><Link to="/reads" onClick={toggleMenu}>Reads</Link></li>
            <li><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
          </ul>
          <div className="ProfileSection" onClick={handleProfileClick}>
            <img src={ProfileIcon} alt="Profile Logo" className="ProfileIcon" />
            <span className="Username">
              {displayName.length > 10 ? `${displayName.slice(0, 10)}...` : displayName}
            </span>
            {showModal && (
              <div className="ModalDropdown" ref={modalRef}>
                <div className="ModalBody">
                  <button onClick={() => handleNavigation('/profile')}>My Profile</button>
                  <button onClick={() => handleNavigation('/settings')}>Settings</button>
                  <button onClick={handleLogout}>Logout</button> 
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="BurgerMenu" onClick={toggleMenu}>
          <div className={`BurgerBar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`BurgerBar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`BurgerBar ${isMenuOpen ? 'open' : ''}`}></div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
