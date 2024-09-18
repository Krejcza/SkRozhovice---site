import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Dropdown from './Dropdown';
import YouthDropdown from './YouthDropdown';
import { navItems } from './NavItems';
import './Navbar.css';
import beelogo from './images/BEE-logo.png';
import menuIcon from './images/hamburger-menu.png';
import closeIcon from './images/close-icon.png';
import Overlay from './Overlay';
import RozhoviceFooter from './images/Rozhovice-footer.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false);
    const [youthDropdown, setYouthDropdown] = useState(false);
    const [showBubbleMenu, setShowBubbleMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80 && !mobileMenuOpen) { 
                setShowBubbleMenu(true);
            } else {
                setShowBubbleMenu(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [mobileMenuOpen]);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const handleMenuClick = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        if (!mobileMenuOpen) {
            setShowBubbleMenu(false);
        }
    };

    return (
        <>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo'>
                    <img src={beelogo} alt='Bee Logo' className='bee-logo-nav' />
                </Link>
                <ul className={`nav-items ${mobileMenuOpen ? 'nav-items-hidden' : ''}`}>
                    {navItems.map(item => {
                        if (item.title === 'Týmy dospělí') {
                            return (
                                <li key={item.id} className={item.cName} 
                                    onMouseEnter={() => setDropdown(true)} 
                                    onMouseLeave={() => setDropdown(false)}>
                                    <Link to={item.path}>{item.title.toUpperCase()}</Link>
                                    {dropdown && <Dropdown />}
                                </li>
                            );
                        }

                        if (item.title === 'Týmy mládež') {
                            return (
                                <li key={item.id} className={item.cName} 
                                    onMouseEnter={() => setYouthDropdown(true)} 
                                    onMouseLeave={() => setYouthDropdown(false)}>
                                    <Link to={item.path}>{item.title.toUpperCase()}</Link>
                                    {youthDropdown && <YouthDropdown />}
                                </li>
                            );
                        }

                        return (
                            <li key={item.id} className={item.cName}>
                                <Link to={item.path}>{item.title.toUpperCase()}</Link>
                            </li>
                        );
                    })}
                </ul>
                <button className='mobile-menu-button' onClick={handleMenuClick}>
                    <img 
                        src={mobileMenuOpen ? closeIcon : menuIcon} 
                        alt='Menu' 
                        className='menu-icon' 
                    />
                </button>
            </nav>

            <div className={`bubble-menu ${showBubbleMenu && !mobileMenuOpen ? 'show' : ''}`}>
                <ul className="bubble-menu-items">
                    <img className='one-bee' src={beelogo} alt="" />
                    <img className='two-bee' src={beelogo} alt="" />
                    <li><Link to='/'>Domů</Link></li>
                    <li><Link to='/Aktuality'>Aktuality</Link></li>
                    <li><Link to='/TymyDospeli'>Týmy dospělí</Link></li>
                    <li className="logo-item">
                        <img src={require('./images/rozhovice-club-logo.png')} alt="Club Logo" className="bubble-logo" />
                    </li>
                    <li><Link to='/TymyMladez'>Týmy mládež</Link></li>
                    <li><Link to='/OKlubu'>O klubu</Link></li>
                    <li><Link to='/Kontakt'>Kontakt</Link></li>
                </ul>
            </div>

            <Overlay isOpen={mobileMenuOpen} onClick={handleMenuClick} />

            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <img src={RozhoviceFooter} className='mobile-image' alt="" />
                <ul className="mobile-menu-items">
                    <li><Link to='/'>Domů</Link></li>
                    <li><Link to='/Aktuality'>Aktuality</Link></li>
                    <li><Link to='/TymyDospeli'>Týmy dospělí</Link></li>
                    <li><Link to='/TymyMladez'>Týmy mládež</Link></li>
                    <li><Link to='/OKlubu'>O klubu</Link></li>
                    <li><Link to='/Kontakt'>Kontakt</Link></li>
                </ul>
                <div className="socials-icons">
                    <a href="https://www.instagram.com/your-page" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} className='social-logo' />
                    </a>
                    <a href="https://www.facebook.com/your-page" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} className='social-logo' />
                    </a>
                </div>
                <p>Copyright SK Rozhovice {new Date().getFullYear()} &copy; </p>
            </div>
        </>
    );
};

export default Navbar;
