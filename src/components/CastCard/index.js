import './index.css'

const CastCard = props => {
  const {castInfo} = props
  const {castId, castImage, castOriginalName, characterName} = castInfo

  return (
    <li key={castId} className="cast-list-item">
      <div className="cast-card">
        <img
          className="cast-image"
          src={`https://image.tmdb.org/t/p/w200/${castImage}`}
          alt={castOriginalName}
        />
        <p className="cast-name-style">{castOriginalName}</p>
        <p className="cast-name-style">{characterName}</p>
      </div>
    </li>
  )
}

export default CastCard
