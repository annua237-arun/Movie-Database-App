import {Link} from 'react-router-dom'
import './index.css'

const MoviePoster = props => {
  const {movieDetails} = props
  const {movieId, movieImage, movieName, rating} = movieDetails

  return (
    <li key={movieId} className="movie-list-item">
      <div className="movie-poster-card">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieImage}`}
          alt={movieName}
          className="movie-image"
        />
        <h1 className="movie-name"> {movieName}</h1>
        <p className="movie-rating">
          Rating: <span className="rating-number">{rating}</span>
        </p>
        <Link to={`/movies/${movieId}`} className="view-button-link">
          <button type="button" className="view-details-btn">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}

export default MoviePoster
