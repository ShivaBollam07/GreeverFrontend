import CompanyLogo from '../assets/Greever-logo.png';
import ProfileIcon from '../assets/profile-logo.png';
import './Styles/Navbar.css';


function Navbar() {
  return (
    <div className='MainDiv'>
      <nav className="Navbar">
        <img src={CompanyLogo} alt="GreeverLogo" className="CompanyLogo" />
        <ul className="NavLinks">
          <li>Courses</li>
          <li>Reads</li>
          <li>About Us</li>
        </ul>
        <img src={ProfileIcon} alt="Profile Logo" className="ProfileIcon" />
      </nav>
    </div>
  );
}

export default Navbar;
