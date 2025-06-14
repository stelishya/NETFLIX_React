import React, { useState } from "react";
// import Youtube from 'react-youtube';
import { useNavigate } from 'react-router-dom';
import styles from "./Rowpost.module.css";
import axios from '../../axios/axios.js'

function Rowpost({ heading, data, isLarge }) {
  const navigate = useNavigate();
  
  const handleMovieChange = (id) => {
    navigate(`/movie/${id}`);
  }
  // const [movieId, setMovieId] = useState(null)
  // const opt = {
  //   height: '600',
  //   width: '100%',
  //   playerVars: {
  //     autoplay: 1,
  //   },
  // };

  // const trailerBar = <div>
  //   <Youtube  opts={opt} videoId={movieId}/>
  // </div>

  // const handleMovieChange = (id)=>{
  //   axios.get(`movie/${id}/videos`).then((res)=>{
  //     console.log(res)
  //     setMovieId(res.data.results[0]?.key)
  //   })
  // }
  
  return (
    <div
      className={`${styles.rowpost} ${isLarge ? styles.large : styles.small}`}
    >
      <h3 style={{color:"white"}}>{heading}</h3>
      <div className={styles.movies}>
        {data?.map?.((movie, index) => {
          return <img 
            className={styles.movie} src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} 
            alt="" 
            onClick={()=>handleMovieChange(movie.id)}
          />
        })}
      </div>
      {/* {movieId && trailerBar} */}
    </div>
  );
}

export default Rowpost;