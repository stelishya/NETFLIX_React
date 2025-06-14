import React, { useState, useRef, useEffect }  from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import searchLogo from "../../assets/search.png";
import notificationLogo from '../../assets/notification.png'
import avatar from '../../assets/avatar.png'
import styles from "./Navbar.module.css";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any user data from localStorage/sessionStorage if needed
    localStorage.removeItem('token'); // Adjust according to your auth implementation
    navigate('/login', { replace: true });
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <img src={logo} alt="Netflix logo" className={styles.logo} />
        <ul className={styles.links}>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse By Language</li>
        </ul>
      </div>
      <div className={styles.right}>
        <img src={searchLogo} alt="" />
        <img src={notificationLogo} alt="" />
        {/* <img src={avatar} alt="" onClick={handleLogout}/> */}
        <div className={styles.avatarContainer} ref={dropdownRef}>
        <img 
            src={avatar} 
            alt="Profile" 
            className={styles.avatar} 
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownItem}>Account</div>
              <div className={styles.dropdownItem}>Profile</div>
              <div className={styles.dropdownItem}>Settings</div>
              <div 
                className={`${styles.dropdownItem} ${styles.logout}`}
                onClick={handleLogout}
              >
                Sign out of Netflix
              </div>
            </div>
          )}
      </div>
      </div>
    </nav>
  );
}

export default Navbar;