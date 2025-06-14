import { Link , useLocation} from "react-router-dom";
import styles from './Header.module.css'

export default function Header(){      
  const location = useLocation();
    const isAuthPage = ['/login', '/signup'].includes(location.pathname);
    if (location.pathname === '/signup') {
      return null;
    }
    return (
      <nav className={styles.nav}>
        <img src="/logo.png" alt="Netflix" />
        {!isAuthPage && (
          <div className={styles.rightControls}>
            <select className={styles.languageSelect}>
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
            <Link to="/login" className={styles.btn}>Sign In</Link>
          </div>
        )}
      </nav>
      )
}