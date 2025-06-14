import styles from "./Landing.module.css"; 
import background from '../../assets/background.jpg'

import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

function Landing(){


    return (
        <>
         <div className={styles.landingContainer}>
      <Header />
      <main>
        <Outlet /> {/* Will render LandingMain / Login / Signup */}
      </main>
    </div>
      <Footer />
      </>

    //     <div className="landing-page">
    //   <nav>
    //     <img src="/netflix-logo.png" alt="Netflix" />
    //     <Link to="/login" className="btn">Sign In</Link>
    //   </nav>
    //   <section className="hero">
    //     <h1>Unlimited movies, TV shows and more</h1>
    //     <h3>Starts at ₹149. Cancel at any time.</h3>
    //     <input type="email" placeholder="Enter email" />
    //     <button>Get Started</button>
    //   </section>
    // </div>
    )
}
export default Landing;