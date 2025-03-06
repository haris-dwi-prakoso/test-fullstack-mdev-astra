import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

function Pagination(props) {
  const [page, setPage] = useState(1)
  const [rows, setRows] = useState(props.items.slice(0, props.itemsPerPage))
  const pages = Math.ceil(props.items.length / props.itemsPerPage)
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1)

  const onClickPrevious = () => {
    let startIndex = (page - 2) * props.itemsPerPage
    let endIndex = startIndex + props.itemsPerPage
    setRows(props.items.slice(startIndex, endIndex))
    setPage(page - 1)
  }

  const onClickNext = () => {
    let startIndex = page * props.itemsPerPage
    let endIndex = startIndex + props.itemsPerPage
    setRows(props.items.slice(startIndex, endIndex))
    setPage(page + 1)
  }

  const onClickPage = (key) => {
    let startIndex = (key - 1) * props.itemsPerPage
    let endIndex = startIndex + props.itemsPerPage
    setRows(props.items.slice(startIndex, endIndex))
    setPage(key)
  }

  return (
    <>
      <span>Page {page}:</span>
      <ul>
        {rows.map((item) => (
          <li>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <button
        disabled={page == 1}
        onClick={() => onClickPrevious()}
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          disabled={page == number}
          onClick={() => onClickPage(number)}
        >
          {number}
        </button>
      ))}
      <button
        disabled={page == pages}
        onClick={() => onClickNext()}
      >
        Next
      </button>
    </>
  )
}

function App() {
  return (
    <Pagination
      items={["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"]}
      itemsPerPage={2}
    />
  )
}

export default App
