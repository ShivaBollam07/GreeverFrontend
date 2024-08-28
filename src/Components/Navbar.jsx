import { Link } from 'react-router-dom';
import CompanyLogo from '../assets/Greever-logo.png';
import ProfileIcon from '../assets/profile-logo.png';
import './Styles/Navbar.css';

function Navbar() {
  return (
    <div className='MainDiv'>
      <nav className="Navbar">
      <Link to="/home"> 
        <img src={CompanyLogo} alt="GreeverLogo" className="CompanyLogo" />
        </Link>
        <ul className="NavLinks">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/reads">Reads</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
        <img src={ProfileIcon} alt="Profile Logo" className="ProfileIcon" />
      </nav>
    </div>
  );
}

export default Navbar;