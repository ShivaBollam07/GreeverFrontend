import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CompanyLogo from '../assets/Greever-logo.png';
import ProfileIcon from '../assets/profile-logo.png';
import './Styles/Navbar.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// eslint-disable-next-line react/prop-types
function Navbar({ username }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const displayName = isLoading ? 'Loading...' : error ? 'User' : name;

  return (
    <div className='MainDiv'>
      <nav className="Navbar">
        <Link to="/home">
          <img src={CompanyLogo} alt="GreeverLogo" className="CompanyLogo" />
        </Link>
        <div className={`NavLinksContainer ${isMenuOpen ? 'active' : ''}`}>
          <ul className="NavLinks">
            <li><Link to="/home" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/courses" onClick={toggleMenu}>Courses</Link></li>
            <li><Link to="/reads" onClick={toggleMenu}>Reads</Link></li>
            <li><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
          </ul>
          <div className="ProfileSection">
            <img src={ProfileIcon} alt="Profile Logo" className="ProfileIcon" onClick={handleShow} />
            <span className="Username">
              {displayName.length > 10 ? `${displayName.slice(0, 10)}...` : displayName}
            </span>
          </div>
        </div>
        
        <Modal show={show} onHide={handleClose} centered className="ProfileModal">
          <Modal.Header closeButton>
            <Modal.Title>Profile Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="ProfileDetails">
              <img src={ProfileIcon} alt="Profile" className="ModalProfileIcon" />
              <h3 className="ModalProfileName">{displayName}</h3>
              <p className="ModalProfileEmail">Email: example@example.com</p>
              <p className="ModalProfileRole">Role: Student</p>
              <div className="ModalProfileButtons">
                <Button variant="primary" onClick={handleClose} className="ProfileButton">
                  My Profile
                </Button>
                <Button variant="secondary" onClick={handleClose} className="ProfileButton">
                  Settings
                </Button>
                <Button variant="danger" onClick={handleClose} className="ProfileButton">
                  Logout
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

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
