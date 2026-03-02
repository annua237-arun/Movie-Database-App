import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import {useParams} from 'react-router-dom'
import MovieNavBar from '../MovieNavBar'
import MoviePoster from '../MoviePoster'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
  failure: 'FAILURE',
}

const SearchedMovies = () => {
  const [moviesList, setMoviesList] = useState([])
  const [fetchApiStatus, setFetchApiStatus] = useState(apiStatus.initial)
  const search = useParams()

  const updatedMovieData = data => {
    const moviesDataList = data.results

    const updatedMoviesDataList = moviesDataList.map(eachMovie => ({
      movieId: eachMovie.id,
      movieName: eachMovie.title,
      movieImage: eachMovie.poster_path,
      rating: eachMovie.vote_average,
    }))

    setMoviesList(updatedMoviesDataList)
  }

  useEffect(() => {
    setFetchApiStatus(apiStatus.inprogress)
    const searchDataApi = `https://api.themoviedb.org/3/search/movie?api_key=819fed71625699e4528f2e4ed98137c9&language=en-US&query=${search}&page=1`
    const options = {
      method: 'GET',
    }

    const fetchSearchedData = async () => {
      try {
        const response = await fetch(searchDataApi, options)
        const searchedData = await response.json()
        if (response.ok) {
          setFetchApiStatus(apiStatus.success)
          updatedMovieData(searchedData)
        }
      } catch (error) {
        console.error('Error during API call:', error)
      }
    }
    fetchSearchedData()
  }, [search])

  const loadingPage = () => (
    <div className="loader-style">
      <Loader type="ThreeDots" color="#3b82f6" height="80" width="80" />
    </div>
  )

  const successPage = () => (
    <>
      <h1 className="popular-movie-heading">Searched movies</h1>
      <ul className="movies-list">
        {moviesList.map(eachMovieData => (
          <MoviePoster movieDetails={eachMovieData} />
        ))}
      </ul>
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
    <div className="bg-color">
      <MovieNavBar />
      {switchCase()}
    </div>
  )
}

export default SearchedMovies
