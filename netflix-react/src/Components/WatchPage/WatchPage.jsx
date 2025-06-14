import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Youtube from 'react-youtube';
import axios from '../../axios/axios.js';
import styles from './WatchPage.module.css';

function WatchPage() {
  const { id } = useParams();
  const [movieId, setMovieId] = useState(null);
  const [movieInfo, setMovieInfo] = useState(null);

  const opt = {
    height: '600',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const trailerBar = <div>
    <Youtube  opts={opt} videoId={movieId}/>
  </div>

//   const handleMovieChange = (id)=>{
//       axios.get(`movie/${id}/videos`).then((res)=>{
//         console.log(res)
//         setMovieId(res.data.results[0]?.key)
//       })
//     }

  useEffect(() => {
    // Fetch movie video
    axios.get(`movie/${id}/videos`).then((res) => {
      if (res.data.results[0]) {
        setMovieId(res.data.results[0].key);
      }
    });

    // Fetch movie info
    axios.get(`movie/${id}`).then((res) => {
      setMovieInfo(res.data);
    });
  }, [id]);

//   if (!movieId || !movieInfo) {
//     return <div>Loading...</div>;
//   }

  return (
    <div className={styles.watchPage}>
      <div className={styles.videoContainer}>
      {movieId && trailerBar}
        {/* <Youtube opts={opt} videoId={movieId} /> */}
      </div>
      {/* <div className={styles.movieInfo}>
        <h1>{movieInfo.title}</h1>
        <p>{movieInfo.overview}</p>
      </div> */}
    </div>
  );
}

export default WatchPage;