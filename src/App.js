import React, {Suspense} from 'react'
import Loader from 'react-loader-spinner'
import {Switch, Route} from 'react-router-dom'
import './App.css'

const PopularMovies = React.lazy(() => import('./components/PopularMovies'))
const TopRatedMovies = React.lazy(() => import('./components/TopRatedMovies'))
const UpcomingMovies = React.lazy(() => import('./components/UpcomingMovies'))
const SingleMovieDetails = React.lazy(() =>
  import('./components/SingleMovieDetails'),
)
const SearchedMovies = React.lazy(() => import('./components/SearchedMovies'))

const App = () => (
  <Suspense
    fallback={
      <div className="loader-style">
        <Loader type="ThreeDots" color="#3b82f6" height="80" width="80" />
      </div>
    }
  >
    <Switch>
      <Route exact path="/" component={PopularMovies} />
      <Route exact path="/top-rated" component={TopRatedMovies} />
      <Route exact path="/upcoming" component={UpcomingMovies} />
      <Route exact path="/movies/:id" component={SingleMovieDetails} />
      <Route exact path="/movies/search/:search" component={SearchedMovies} />
    </Switch>
  </Suspense>
)

export default App
