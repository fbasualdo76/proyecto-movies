import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CardMovie from '../../common/cardMovie/CardMovie';
import Header from '../../common/header/Header';
import confetti from "canvas-confetti";
import MovieModal from '../../common/movieModal/MovieModal';
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [dispatchLike, setDispatchLike] = useState(false);
  const [favorites, setFavorites] = useState(false);
  //estados de Modal.
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //estados para crear y eliminar películas.
  const [isMovieCreated, setIsMovieCreated] = useState(false)
  const [isMovieDeleted, setIsMovieDeleted] = useState(false)
  useEffect(() => {
    /*axios.get("http://localhost:5000/movies")*/
    axios.get("https://api-proyecto-movies.onrender.com/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err));
    setDispatchLike(false)
    setIsMovieCreated(false)
    setIsMovieDeleted(false)
  }, [dispatchLike, isMovieCreated, isMovieDeleted]);
  const handleLike = (movie) => {
    if (!movie.isLiked) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 0.5,
          y: 0
        }
      })
    }
    /*axios.patch(`http://localhost:5000/movies/${movie.id}`, { isLiked: !movie.isLiked })*/
    axios.patch(`https://api-proyecto-movies.onrender.com/movies/${movie.id}`, { isLiked: !movie.isLiked })
      .then(res => setDispatchLike(true))
      .catch(err => console.log(err))
  }
  const moviesFavorites = movies.filter(movie => movie.isLiked)
  const deleteMovie = (id) => {
    /*axios.delete(`http://localhost:5000/movies/${id}`)*/
    axios.delete(`https://api-proyecto-movies.onrender.com/movies/${id}`)
      .then(res => setIsMovieDeleted(true))
      .catch(err => console.log(err))
  }
  return (
    <>
      <Header
        setFavorites={setFavorites}
        handleOpen={handleOpen}
      />
      <MovieModal
        open={open}
        handleClose={handleClose}
        setIsMovieCreated={setIsMovieCreated}
      />
      <div style={{
        //backgroundColor: "black",
        display: "flex",
        //minHeight: "100vh",
        //justifyContent: "center",
        //alignItems: "center",
        gap: "30px",
        padding: "20px",
        flexWrap: "wrap",
        marginTop: '64px', // Add margin at the top
      }}>
        {
          !favorites ? (movies.map((movie) => {
            return (
              <CardMovie
                key={movie.id}
                movie={movie}
                handleLike={handleLike}
                deleteMovie={deleteMovie}
              />
            )
          })) : (moviesFavorites.map((movie) => {
            return (
              <CardMovie
                key={movie.id}
                movie={movie}
                handleLike={handleLike}
                deleteMovie={deleteMovie}
              />
            )
          }))
        }
      </div>
      </>
  )
}
export default Home