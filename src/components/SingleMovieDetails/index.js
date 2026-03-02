import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import MovieNavBar from '../MovieNavBar'

import './index.css'
import CastCard from '../CastCard'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
  failure: 'FAILURE',
}

const SingleMovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null)
  const [castDetails, setCastDetails] = useState([])
  const [fetchApiStatus, setFetchApiStatus] = useState(apiStatus.initial)
  const {id} = useParams()

  const movieDetailsSection = movieData => {
    const singleMovieDetails = {
      movieName: movieData.title,
      image: movieData.poster_path,
      ratings: movieData.vote_average,
      duration: movieData.runtime,
      genre: movieData.genres,
      releaseDate: movieData.release_date,
      overView: movieData.overview,
    }

    setMovieDetails(singleMovieDetails)
  }

  const castDetailsSection = castData => {
    const movieCastList = castData.map(eachCast => ({
      castId: eachCast.id,
      castImage: eachCast.profile_path,
      castOriginalName: eachCast.original_name,
      characterName: eachCast.character,
    }))

    setCastDetails(movieCastList)
  }

  useEffect(() => {
    setFetchApiStatus(apiStatus.inprogress)
    const movieDetailsApi = `https://api.themoviedb.org/3/movie/${id}?api_key=819fed71625699e4528f2e4ed98137c9&language=en-US`
    const options = {
      method: 'GET',
    }

    const castDetailsApi = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=819fed71625699e4528f2e4ed98137c9&language=en-US`

    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(movieDetailsApi, options)
        const singleMovieData = await movieResponse.json()
        // console.log(singleMovieData)
        setFetchApiStatus(apiStatus.success)
        movieDetailsSection(singleMovieData)
      } catch (error) {
        console.error('Error while fetching Movie Details API:', error)
      }
    }

    const fetchCastDetails = async () => {
      try {
        const castResponse = await fetch(castDetailsApi, options)
        const castData = await castResponse.json()
        // console.log(castData)
        castDetailsSection(castData.cast)
      } catch (error) {
        console.error('Error while fetching Cast Details API:', error)
      }
    }

    fetchMovieDetails()
    fetchCastDetails()
  }, [id])

  //   console.log(movieDetails)
  //   console.log(castDetails)
  if (!movieDetails) {
    return (
      <div className="loader-style">
        <Loader type="ThreeDots" color="#3b82f6" height="80" width="80" />
      </div>
    )
  }

  const loadingPage = () => (
    <div className="loader-style">
      <Loader type="ThreeDots" color="#3b82f6" height="80" width="80" />
    </div>
  )

  const successPage = () => (
    <>
      <div className="single-movie-details">
        <div className="single-movie-details-section">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.image}`}
            alt={movieDetails.movieName}
            className="single-movie-poster"
          />
          <div>
            <h1 className="single-movie-name">{movieDetails.movieName}</h1>
            <ul className="genre-list">
              {movieDetails.genre.map(eachGenre => (
                <li key={eachGenre.id} className="genre-item">
                  {eachGenre.name}
                </li>
              ))}
            </ul>
            <p className="duration">Duration: {movieDetails.duration} Mins</p>

            <div className="sub-details-section">
              <p className="sub-details">
                Released on: {movieDetails.releaseDate}
              </p>
              <p className="sub-details">Ratings: {movieDetails.ratings}</p>
            </div>
            <p className="about-movie">{movieDetails.overView}</p>
          </div>
        </div>
        <div className="single-cast-details-section">
          <h1 className="single-movie-name">Cast</h1>
          <ul className="cast-details-list">
            {castDetails.map(eachCast => (
              <CastCard castInfo={eachCast} />
            ))}
          </ul>
        </div>
      </div>
    </>
  )

  const switchCase = () => {
    switch (fetchApiStatus) {
      case apiStatus.inprogress:
        return loadingPage()
      case apiStatus.success:
        return successPage()
      default:
        return null
    }
  }

  return (
    <>
      <MovieNavBar />
      {switchCase()}
    </>
  )
}

export default SingleMovieDetails
