import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import MovieNavBar from '../MovieNavBar'
import MoviePoster from '../MoviePoster'

import './index.css'
import Pagination from '../Pagination'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
  failure: 'FAILURE',
}

const PopularMovies = () => {
  const [moviesList, setMoviesList] = useState([])
  const [fetchApiStatus, setFetchApiStatus] = useState(apiStatus.initial)
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPages, setMaxPages] = useState()
  const totalPages = 10

  const onPageChange = page => {
    setCurrentPage(page)
  }

  const onPrevClick = () => {
    if (currentPage > 1) {
      const pageNo = currentPage - 1
      setCurrentPage(pageNo)
    }
  }

  const onNextClick = () => {
    if (currentPage < maxPages) {
      const pageNo = currentPage + 1
      setCurrentPage(pageNo)
    }
  }

  const updatedMovieData = data => {
    const moviesDataList = data.results
    setMaxPages(data.total_pages)

    const updatedMoviesDataList = moviesDataList.map(eachMovie => ({
      movieId: eachMovie.id,
      movieName: eachMovie.title,
      movieImage: eachMovie.poster_path,
      rating: eachMovie.vote_average,
    }))

    setMoviesList(updatedMoviesDataList)
  }

  useEffect(() => {
    const getPopularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=819fed71625699e4528f2e4ed98137c9&language=en-US&page=${currentPage}`
    const options = {
      method: 'GET',
    }
    setFetchApiStatus(apiStatus.inprogress)
    const fetchData = async () => {
      try {
        const response = await fetch(getPopularMoviesURL, options)
        const data = await response.json()
        if (response.ok) {
          setFetchApiStatus(apiStatus.success)
          updatedMovieData(data)
        } else {
          console.error(data.error)
        }
      } catch (error) {
        console.error('Error during API call:', error)
      }
    }
    fetchData()
  }, [currentPage])

  const loadingPage = () => (
    <div className="loader-style">
      <Loader type="ThreeDots" color="#3b82f6" height="80" width="80" />
    </div>
  )

  const successPage = () => (
    <>
      <h1 className="popular-movie-heading">Popular</h1>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextClick={onNextClick}
        onPrevClick={onPrevClick}
        onSelectPage={onPageChange}
      />
    </div>
  )
}

export default PopularMovies
