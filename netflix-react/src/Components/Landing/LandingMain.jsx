import React,{useState, useEffect, useRef} from 'react';
import styles from './Landing.module.css';
import axios, { popular } from '../../axios/axios';


const LandingMain = () => {
  // const [faqOpen, setFaqOpen] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    axios.get(popular).then((res) => {
      setTrendingMovies(res.data.results);
    }).catch(err => {
      console.error("Error fetching trending movies:", err);
    });
  }, []);

  const scroll = (direction) => {
    if (listRef.current) {
      const { scrollLeft, clientWidth } = listRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      listRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.landingContainer}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Unlimited movies, TV <br/> shows and more</h1>
          <h2>Starts at ₹149. Cancel at any time.</h2>
          <p>Ready to watch? Enter your email to create or restart your membership.</p>
          <form className={styles.emailForm}>
            <input type="email" placeholder="Email address" />
            <button>Get Started &gt;</button>
          </form>
        </div>
      </section>

      <section className={styles.trendingSection}>
        <h2>Trending Now</h2>
        <div className={styles.trendingContainer}>
          <button className={`${styles.scrollArrow} ${styles.left}`} onClick={() => scroll('left')}>
            &#8249;
          </button>
        <div className={styles.trendingList} ref={listRef}>
          {
            trendingMovies.map((movie,index)=>(
              <div key={movie.id} className={styles.movieItem}>
              <span className={styles.movieNumber}>{index + 1}</span>
              <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title || movie.name} />
            </div>
            ))
          }
          </div>
          <button className={`${styles.scrollArrow} ${styles.right}`} onClick={() => scroll('right')}>
            &#8250;
          </button>
          </div>
      </section>

      <section className={styles.featuresSection}>
        <h2>More reasons to join</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureBox}>
            <h3>Enjoy on your TV</h3>
            <p>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
          </div>
          <div className={styles.featureBox}>
            <h3>Download your shows to watch offline</h3>
            <p>Save your favourites easily and always have something to watch.</p>
          </div>
          <div className={styles.featureBox}>
            <h3>Watch everywhere</h3>
            <p>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
          </div>
          <div className={styles.featureBox}>
          <h3>Create profiles for kids</h3>
          <p>Send children on adventures with their favourite characters in a space made just for them—free with your membership.</p>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <h2>Frequently Asked Questions</h2>
        <ul>
          <li>What is Netflix? <span>+</span></li>
          <li>How much does Netflix cost?<span>+</span></li>
          <li>Where can I watch?<span>+</span></li>
          <li>How do I cancel?<span>+</span></li>
          <li>What can I watch on Netflix?<span>+</span></li>
          <li>Is Netflix good for kids?<span>+</span></li>
        </ul>
      </section>

      <section className={styles.signupSection}>
        <p>Ready to watch? Enter your email to create or restart your membership.</p>
        <div className={styles.emailForm}>
          <input type="email" placeholder="Email address" />
          <button>Get Started &gt;</button>
        </div>
      </section>
    </div>
  );
};

export default LandingMain;