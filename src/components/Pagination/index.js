import './index.css'

const Pagination = ({
  totalPages,
  currentPage,
  onSelectPage,
  onPrevClick,
  onNextClick,
}) => {
  const pageNumbers = [...Array(totalPages).keys()].map(
    num => currentPage + num,
  )

  return (
    <div className="pagination">
      <button type="button" onClick={onPrevClick} className="pre-nxt-buttons">
        Prev
      </button>
      <ul className="pages-list">
        {pageNumbers.map(num => (
          <li key={num}>
            <button
              type="button"
              onClick={() => onSelectPage(num)}
              className={`page-button ${
                currentPage === num ? 'active-page' : null
              }`}
            >
              {num}
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={onNextClick} className="pre-nxt-buttons">
        Next
      </button>
    </div>
  )
}

export default Pagination
