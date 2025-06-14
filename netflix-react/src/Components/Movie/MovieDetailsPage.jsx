import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay, FaPlus, FaThumbsUp, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import styles from './MovieDetailsPage.module.css';
import axios from '../../axios/axios.js';

import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer';

export default function MovieDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isMuted, setIsMuted] = useState(true);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [movie, setMovie] = useState(null);
    // const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchMovieDetails = async ()=>{
            try {
                const movieDetails = await axios.get(`/movie/${id}`);
                const credits = await axios.get(`/movie/${id}/credits`)
                const videos = await axios.get(`/movie/${id}/videos`)

                console.log("movieDetails: "+movieDetails)
                console.log("credits: "+credits)
                console.log("videos: "+videos)

                setMovie({
                    ...movieDetails.data,
                    cast: credits.data.cast.slice(0, 3).map(cast => cast.name),
                    director: credits.data.crew.find(crew => crew.job === 'Director')?.name || 'N/A',
                    videoId: videos.data.results[0]?.key,
                    maturityRating: movieDetails.data.adult ? '18+' : '13+',
                    maturityReasons: ['Violence', 'Strong Language', 'Frightening Scenes']
                  });
            } catch (error) {
                        console.error('Error fetching movie details:', error);
            }
            // finally{
            //     setLoading(false)
            // }
        }
        fetchMovieDetails()
    },[id])

    // if (loading) {
    //     return <div className={styles.loading}>Loading...</div>;
    //   }

      if (!movie) {
        return <div className={styles.error}>Movie not found</div>;
      }
    // Mock movie data - replace with actual data from your API
    // const movie = {
    //   id: id,
    //   title: "The Witcher: Nightmare of the Wolf",
    //   description: "Escaping from poverty to become a witcher, Vesemir slays monsters for coin and glory, but when a new menace rises, he must face the demons of his past.",
    //   year: "2021",
    //   ageRating: "16+",
    //   duration: "1h 23m",
    //   genres: ["Action", "Adventure", "Animation"],
    //   cast: ["Theo James", "Lara Pulver", "Graham McTavish"],
    //   director: "Kwang Il Han",
    //   maturityRating: "16+",
    //   maturityReasons: ["Violence", "Gore", "Strong Language", "Frightening Scenes"]
    // };
    const handlePlay = () => {
        navigate(`/watch/${id}`);
    };
    const handleAddToWatchList = () => {
        setIsInWatchlist(true)
    }
 return (
    <div className={styles.container}>
        <Navbar/>
      <div className={styles.detailsWrapper}>
      <div className={styles.posterSection}>
      <img
        className={styles.poster}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
    </div>
    <div className={styles.infoSection}>
          <div className={styles.background}>
        <div className={styles.overlay}>
          <div className={styles.content}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{movie.title}</h1>
            <span className={styles.rating}>
              {movie.vote_average?.toFixed(1)} <span className={styles.star}>★</span>
            </span>
          </div>
            <div className={styles.meta}>
              {/* <span className={styles.match}>98% Match</span> */}
              <span className={styles.year}>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>|
              <span className={styles.duration}>{movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A'}</span>|
              <span className={styles.maturityRating}>{movie.maturityRating}</span>
              {/* <span className={styles.hd}>HD</span> */}
            </div>
            
            <div className={styles.actions}>
              <button className={styles.playButton} onClick={handlePlay}>
                <FaPlay className={styles.icon} /> Play
              </button>
              <button className={styles.secondaryButton} onClick={handleAddToWatchList}>
                <FaPlus className={styles.icon} /> My List
              </button>
              {/* <button className={styles.iconButton}>
                <FaThumbsUp className={styles.icon} />
              </button> */}
              {/* <button 
                className={styles.volumeButton} 
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button> */}
            </div>
            <div>
                <h3>Overview</h3>
            <p>{movie.overview}</p>
            </div>
            {/* <div className={styles.genres}>
              {movie.genres.map((genre, index) => (
                <span key={index} className={styles.genreTag}>{genre.name}</span>
              ))}
            </div> */}

            {/* <p className={styles.description}>{movie.description}</p> */}

            <div className={styles.details}>
              <div className={styles.detailRow}>
              {/* <span className={styles.detailLabel}>Cast:</span>
              <span className={styles.detailLabel}>Cast:</span>
              <span className={styles.detailLabel}>Cast:</span> */}

                <span className={styles.detailLabel}>Starring:</span>
                <span>{movie.cast.join(', ')}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Created By:</span>
                <span>{movie.director}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Genre:</span>
                {movie.genres.map((genre, index) => (
                <span key={index} className={styles.genreTag}>{genre.name}</span>
              ))}
              </div>
            </div>

            {/* <div className={styles.maturityRating}>
              <div className={styles.ratingBadge}>{movie.maturityRating}</div>
              <div className={styles.ratingDetails}>
                <p>This show is rated {movie.maturityRating} for:</p>
                <ul className={styles.ratingReasons}>
                  {movie.maturityReasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </div>
            </div> */}
            {/* <div>
                <h3>Related Movies
                <div className={styles.relatedMovies}>
                    
                </div>
                </h3>
            </div> */}
          </div>
        </div>

    </div>
    </div>
      </div>
      <Footer/>
    </div>
 )   
}