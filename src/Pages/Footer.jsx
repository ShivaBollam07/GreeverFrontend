import './Styles/Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="Footer">
            <div className="FooterContainer">
                <div className="FooterLogo">
                    <h2>Greever</h2>
                    <p>Connecting people through knowledge.</p>
                </div>

                <div className="FooterLinks">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/courses">Courses</Link></li>
                        <li><Link to="/reads">Reads</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                
            </div>

            <div className="FooterBottom">
                <p>&copy; {new Date().getFullYear()} Greever. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
